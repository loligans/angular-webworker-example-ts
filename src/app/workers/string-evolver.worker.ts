import { StringEvolver } from "string-evolver-ts";
import { MessageType, GAInitialize, GACompute, GAResult } from "./string-evolver-messages";
// prevent TypeScript compile error
const customPostMessage: any = postMessage;
let GA: StringEvolverWorker;

class StringEvolverWorker {
  private StringEvolver: StringEvolver;
  private Solution: string;
  constructor(settings: GAInitialize) {
    this.StringEvolver = new StringEvolver(settings.PopulationSize, settings.Solution);
    this.postMessage(false);
  }

  public computeGeneration(generations: number) {
    let foundSolution: boolean = false;

    for (let i = 1; i <= generations; i++) {
      foundSolution = this.StringEvolver.computeGeneration();
      if (foundSolution) {
        this.postMessage(foundSolution);
        return;
      } else if (i % 100 === 0) {
        this.postMessage(foundSolution, true);
      }
    }

    this.postMessage(foundSolution);
  }

  private postMessage(foundSolution: boolean, running: boolean = false) {
    const result: GAResult = {
      Type: MessageType.Result,
      Running: running,
      FoundSolution: foundSolution,
      Generation: this.StringEvolver.Generation,
      Population: this.StringEvolver.Population
    };
    customPostMessage(result);
  }
}

// Worker API
onmessage = function (event: MessageEvent) {
  const message: GAInitialize | GACompute = event.data;
  if (message.Type === MessageType.Initialize) {
    GA = new StringEvolverWorker(<GAInitialize>message);
  } else if (message.Type === MessageType.Compute) {
    GA.computeGeneration((<GACompute>message).Generations);
  }
};
