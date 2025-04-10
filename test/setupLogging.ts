import { testLogPath } from "./paths.ts";

export interface SimpleLogger {
  info(msg: string): Promise<void>;
  critical(msg: string): Promise<void>;
}

export default async (logFilePath: string = testLogPath): Promise<SimpleLogger> => {
  // Ensure the log file exists and is ready for writing
  const file = await Deno.open(logFilePath, { write: true, create: true, truncate: true });

  // Helper function to write logs to file
  async function writeLog(level: string, message: string) {

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;

    // Write the log message to file
    await Deno.writeTextFile(logFilePath, logMessage, { append: true });
    if (level === "CRITICAL") {
      // Flush the file for critical messages
      await file.sync();
    }
  }

  const logger: SimpleLogger = {
    async info(msg: string) {
      await writeLog("INFO", msg);
    },
    async critical(msg: string) {
      await writeLog("CRITICAL", msg);
    }
  };

  return logger;
}
