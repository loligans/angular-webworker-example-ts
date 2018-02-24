import { GeneticAlgorithm } from "../../../../genetic-algorithm/src/genetic-algorithm";
import { MessageType, GAInitialize } from "./genetic-algorithm-messages";
// prevent TypeScript compile error
const customPostMessage: any = postMessage;
let GA: GeneticAlgorithmWorker;

class GeneticAlgorithmWorker {
  private GeneticAlgorithm: GeneticAlgorithm;
  private Solution: string;
  constructor(settings: GAInitialize) {
    this.GeneticAlgorithm = new GeneticAlgorithm(settings.PopulationSize, settings.Solution);
    this.postMessage(false);
  }

  public computeGeneration(generations: number) {
    let foundSolution: boolean = false;

    for (let i = 1; i <= generations; i++) {
      foundSolution = this.GeneticAlgorithm.computeGeneration();
      if (foundSolution) {
        this.postMessage(foundSolution);
        return;
      } else if (i % 100 === 0) {
        this.postMessage(foundSolution);
      }
    }

    this.postMessage(foundSolution);
  }

  private postMessage(foundSolution: boolean) {
    customPostMessage({
      Type: MessageType.Result,
      Running: false,
      FoundSolution: foundSolution,
      Generation: this.GeneticAlgorithm.Generation,
      Population: this.GeneticAlgorithm.Population
    });
  }
}

// Worker API
onmessage = function (event: MessageEvent) {
  const message = event.data;
  if (message.Type === MessageType.Initialize) {
    GA = new GeneticAlgorithmWorker(message);
  } else if (message.Type === MessageType.Compute) {
    GA.computeGeneration(message.Generations);
  }
};
