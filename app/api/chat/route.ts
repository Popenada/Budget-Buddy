import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface BudgetAnalysis {
  pros: string[];
  cons: string[];
  recommendation: "spend" | "dont_spend";
  reasoning: string;
}

export interface BudgetData {
  rent: number;
  gas: number;
  utilities: number;
  groceries: number;
  other: number;
}

// Parsing budget data safely as a number regardless if user doesn't input a number
function parseBudget(raw: Record<string, unknown>): BudgetData {
  return {
    rent: Number(raw.rent) || 0,
    gas: Number(raw.gas) || 0,
    utilities: Number(raw.utilities) || 0,
    groceries: Number(raw.groceries) || 0,
    other: Number(raw.other) || 0,
  };
}

export async function POST(request: NextRequest) {

  // Wait for inquiry from user and budget from frontend component input
  const { inquiry, budget } = await request.json();

  const safeBudget = parseBudget(budget ?? {});

  const totalMonthly = Object.values(safeBudget).reduce((a, b) => a + b, 0);

  // Building the prompt
  const budgetContext = `Monthly Fixed Costs:
- Rent/Mortgage: $${safeBudget.rent}
- Gas/Transportation: $${safeBudget.gas}
- Utilities: $${safeBudget.utilities}
- Groceries: $${safeBudget.groceries}
- Other recurring costs: $${safeBudget.other}
- Total monthly fixed costs: $${totalMonthly}`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      // Structured output reinforcement of tooling
      // Tooling + schema for both pros and cons
      tools: [
        {
          name: "budget_analysis",
          description:
            "Analyze a spending decision given the user's monthly budget context",
          input_schema: {
            type: "object" as const,
            properties: {
              // Listing of pros and cons as array of strings
              pros: {
                type: "array",
                items: { type: "string" },
                description: "Benefits or reasons to make this purchase",
              },
              cons: {
                type: "array",
                items: { type: "string" },
                description: "Drawbacks or reasons not to make this purchase",
              },
              recommendation: {
                type: "string",
                // Only allow specific predefined values spend or not to spen d
                enum: ["spend", "dont_spend"],
                description: "Final recommendation on whether to spend",
              },
              reasoning: {
                type: "string",
                description: "Brief explanation of the recommendation",
              },
            },
            required: ["pros", "cons", "recommendation", "reasoning"],
          },
        },
      ],
      tool_choice: { type: "any" },
      // System prompt to be a financial advisor
      system:
        "You are a practical personal finance advisor. Analyze spending decisions based on the user's monthly budget. Be direct and concise. Consider their fixed monthly obligations when making your recommendation.",
      // User inquiry expectations to anthropic API
      messages: [
        {
          role: "user",
          content: `${budgetContext}\n\nSpending inquiry: ${inquiry}`,
        },
      ],
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return Response.json({ error: "Analysis failed" }, { status: 500 });
    }

    return Response.json(toolUse.input as BudgetAnalysis);
  } catch (error) {
    console.error("Anthropic API error:", error);
    return Response.json(
      { error: "Failed to analyze budget. Please try again." },
      { status: 500 }
    );
  }
}
