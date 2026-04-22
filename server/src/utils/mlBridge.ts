import { spawn } from 'child_process';
import path from 'path';

export const callMLModel = (symptoms: string[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, '..', 'ml', 'predict.py');
    const symptomsJson = JSON.stringify(symptoms);

    const pythonProcess = spawn('python', [pythonScript, symptomsJson]);

    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorString += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(`Python process exited with code ${code}: ${errorString}`);
      }
      try {
        const result = JSON.parse(dataString);
        if (result.error) {
          return reject(result.error);
        }
        resolve(result);
      } catch (e) {
        reject(`Failed to parse ML output: ${dataString}`);
      }
    });
  });
};
