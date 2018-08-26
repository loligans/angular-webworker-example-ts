import { Candidate } from "string-evolver-ts";

/** Determines the type of message sent to the StringEvolverWorker */
export enum MessageType {
  Initialize,
  Compute,
  Result
}
/** Message sent to the StringEvolverWorker to initialize */
export interface GAInitialize {
  Type: MessageType;
  PopulationSize: number;
  Solution: string;
}
/** Message sent to the StringEvolverWorker to compute a number of generations */
export interface GACompute {
  Type: MessageType;
  Generations: number;
}
/** Message sent from the StringEvolverWorker containing results from a computation */
export interface GAResult {
  Type: MessageType;
  Running: boolean;
  FoundSolution: boolean;
  Generation: number;
  Population: Array<Candidate>;
}
