import { Candidate } from "../../../../genetic-algorithm/src/candidate";

export enum MessageType {
  Initialize,
  Compute,
  Result
}
export interface GAInitialize {
  Type: MessageType;
  PopulationSize: number;
  Solution: string;
}
export interface GACompute {
  Type: MessageType;
  Generations: number;
}
export interface GAResult {
  Type: MessageType;
  Running: boolean;
  FoundSolution: boolean;
  Generation: number;
  Population: Array<Candidate>;
}
