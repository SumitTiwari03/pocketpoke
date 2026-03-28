import { prisma } from "@/server/db";

export async function GET() {
  try {
    // simple check
    await prisma.pokemon.count();

    return Response.json({
      ok: true,
      time: new Date().toISOString(),
    });
  } catch (err) {
    console.error("health check error", err);

    return Response.json(
      {
        ok: false,
        error: "db not reachable",
      },
      { status: 500 }
    );
  }
}