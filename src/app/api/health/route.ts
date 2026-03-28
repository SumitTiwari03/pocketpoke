import { prisma } from "@/server/db";

/**
 * Health Check Endpoint
 * 
 * Purpose: Verify backend and database are active and responsive
 * 
 * Usage:
 * - UptimeRobot monitoring (prevents cold start on Vercel)
 * - Application health dashboard
 * - Load balancer health checks
 * 
 * Endpoint: GET /api/health
 * 
 * Response (Success - 200):
 * {
 *   "status": "ok",
 *   "timestamp": "2026-03-28T10:30:45.123Z",
 *   "database": "connected"
 * }
 * 
 * Response (Failure - 503):
 * {
 *   "status": "error",
 *   "timestamp": "2026-03-28T10:30:45.123Z",
 *   "database": "disconnected",
 *   "error": "Connection refused"
 * }
 */
export async function GET() {
  try {
    // Test database connection with a simple query
    // SELECT 1 is the lightest possible query - doesn't fetch any real data
    await prisma.$queryRaw`SELECT 1`;

    return Response.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        database: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return Response.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}

/**
 * Why use SELECT 1?
 * - Fastest possible query (no table scan)
 * - Tests database connection without fetching data
 * - Minimal server/database resource usage
 * - Cross-database compatible (works on PostgreSQL, MySQL, etc.)
 * 
 * Why return 503 on error?
 * - 503 Service Unavailable signals uptime monitors to alert
 * - Distinguishes from 404 (missing endpoint) or 500 (app error)
 * - Allows load balancers to remove this server from rotation
 */
