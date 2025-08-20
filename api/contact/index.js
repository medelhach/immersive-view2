const { TableClient } = require("@azure/data-tables");
const crypto = require("crypto");

module.exports = async function (context, req) {
  try {
    if (req.method !== "POST") {
      context.res = { status: 405, headers: { "Allow": "POST" }, body: { error: "Method not allowed" } };
      return;
    }

    const body = req.body || {};
    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email) {
      context.res = { status: 400, body: { error: "name and email are required" } };
      return;
    }

    const conn = process.env.STORAGE_CONNECTION_STRING;
    const tableName = process.env.TABLE_NAME || "leads";
    if (!conn) {
      context.res = { status: 500, body: { error: "Storage connection string missing" } };
      return;
    }

    const client = TableClient.fromConnectionString(conn, tableName);
    try { await client.createTable(); } catch (_) {}

    const rowKey = crypto.randomUUID();
    const entity = {
      partitionKey: "lead",
      rowKey,
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
      ip: req.headers["x-forwarded-for"] || "",
      ua: req.headers["user-agent"] || ""
    };

    await client.createEntity(entity);

    context.res = { status: 200, headers: { "Content-Type": "application/json" }, body: { ok: true, id: rowKey } };
  } catch (err) {
    context.log("contact error", err);
    context.res = { status: 500, body: { error: "server error" } };
  }
};
