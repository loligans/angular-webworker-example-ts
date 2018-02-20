import { GeneticAlgorithm } from "../../../../genetic-algorithm/src/genetic-algorithm";
import { MessageType, GAInitialize, GACompute, GAResult } from "./genetic-algorithm-messages";
// prevent TypeScript compile error
const customPostMessage: any = postMessage;
let GA: GeneticAlgorithmWorker;

class GeneticAlgorithmWorker {
  private GeneticAlgorithm: GeneticAlgorithm;
  private Solution: string;
  private FoundSolution: boolean;
  constructor(settings: GAInitialize) {
    this.GeneticAlgorithm = new GeneticAlgorithm(settings.PopulationSize, settings.Solution);
    
    customPostMessage({
      Type: MessageType.Result, 
      Running: false,
      FoundSolution: false, 
      Generation: this.GeneticAlgorithm.Generation,
      Population: this.GeneticAlgorithm.Population
    });
  }

  public computeGeneration(generations: number) {
    let solution: boolean = false;

    for (let i = 1; i <= generations; i++) {
      solution = this.GeneticAlgorithm.computeGeneration();
      if (solution) {
        customPostMessage({
          Type: MessageType.Result,
          Running: false,
          FoundSolution: solution,
          Generation: this.GeneticAlgorithm.Generation,
          Population: this.GeneticAlgorithm.Population
        });
        return;
      } else if (i % 100 === 0) {
        customPostMessage({
          Type: MessageType.Result,
          Running: true,
          FoundSolution: solution,
          Generation: this.GeneticAlgorithm.Generation,
          Population: this.GeneticAlgorithm.Population
        });
      }
    }

    customPostMessage({
      Type: MessageType.Result,
      Running: false,
      FoundSolution: solution,
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
