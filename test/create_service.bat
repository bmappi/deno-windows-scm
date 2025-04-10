@echo off

set BAD_SLASH_SCRIPT_DIR=%~dp0
set SCRIPT_DIR=%BAD_SLASH_SCRIPT_DIR:\=/%

set deno_exe="%USERPROFILE%"\.deno\bin\deno.exe
set deno_options=--allow-ffi --allow-read --allow-net --allow-write
set entry_point_script=%SCRIPT_DIR%scmEntryPoint.ts

sc create deno_windows_scm_test ^
    binpath="%deno_exe% run %deno_options% %entry_point_script%"

echo Service installed, to delete it run: "sc stop deno_windows_scm_test && sc delete deno_windows_scm_test"

echo to edit it run: sc config deno_windows_scm_test binpath="%deno_exe% run %deno_options% %entry_point_script%"