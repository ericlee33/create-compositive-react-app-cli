import execa from 'execa';

function executeCommand(command, argv, cwd) {
  return new Promise<void>((resolve, reject) => {
    const child = execa(command, argv, {
      cwd,
      stdio: ['inherit', 'pipe', 'inherit'],
    });

    child.stdout?.on('data', buffer => {
      process.stdout.write(buffer);
    });

    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`command failed: ${command}`));
        return;
      }

      resolve();
    });
  });
}

export default executeCommand;
