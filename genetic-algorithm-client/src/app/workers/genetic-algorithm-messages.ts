import { Candidate } from "../../../../genetic-algorithm/src/candidate";

/** Determines the type of message sent to the GeneticAlgorithmWorker */
export enum MessageType {
  Initialize,
  Compute,
  Result
}
/** Message sent to the GeneticAlgorithmWorker to initialize */
export interface GAInitialize {
  Type: MessageType;
  PopulationSize: number;
  Solution: string;
}
/** Message sent to the GeneticAlgorithmWorker to compute a number of generations */
export interface GACompute {
  Type: MessageType;
  Generations: number;
}
/** Message sent from the GeneticAlgorithmWorker containing results from a computation */
export interface GAResult {
  Type: MessageType;
  Running: boolean;
  FoundSolution: boolean;
  Generation: number;
  Population: Array<Candidate>;
}
