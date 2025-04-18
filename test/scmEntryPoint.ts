/*
 * Copyright 2021, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { winscmStartDispatcher } from "../ts/mod.ts";
import { libPath, scmLogPath, workerPath } from "./paths.ts";
import { startServer, stopServer } from "./server.ts";
import setupLogging from "./setupLogging.ts";

const logger = await setupLogging();

try {
  logger.info("Is due to call 'winscmStartDispatcher' ...");
  const prom = winscmStartDispatcher({
    libraryPath: libPath,
    serviceName: "deno_windows_scm_test",
    logFilePath: scmLogPath,
    workerPath: workerPath
  });
  logger.critical("'winscmStartDispatcher' is called, going to await on it ...");
  logger.info("Starting server ...");
  const server = await startServer();

  await prom;

  logger.info("'winscmStartDispatcher' resolved, stopping server ...");

  await stopServer(server);
  
  logger.info("'winscmStartDispatcher' success");
} catch (e) {
  logger.info(`'winscmStartDispatcher' failure, error: [${e}]`);
}
