import { Injectable } from '@angular/core';
import { MessageType } from '../workers/genetic-algorithm-messages';
import * as GeneticAlgorithmWorker from 'worker-loader!../../../out/genetic-algorithm.worker.bundle.js';

@Injectable()
export class GeneticAlgorithmService {
  private _GeneticAlgorithmWorker: Worker;
  private _GeneticAlgorithmCallback: (event: MessageEvent) => void;

  public init(popSize: number, solution: string, callback: (event: MessageEvent) => void): void {
    if(this._GeneticAlgorithmWorker) {
      return;
    }
    // Initialize the worker
    this._GeneticAlgorithmWorker = new GeneticAlgorithmWorker();
    this._GeneticAlgorithmCallback = callback;
    this._GeneticAlgorithmWorker.onmessage = callback;
    
    // Intialize the Genetic Algorithm
    this._GeneticAlgorithmWorker.postMessage({
      Type: MessageType.Initialize, 
      PopulationSize: popSize, 
      Solution: solution
    });
  }

  public computeGeneration(generations: number) {
    if (!this._GeneticAlgorithmWorker) {
      return;
    }

    // Run the genetic algorithm for the specified number of generations
    this._GeneticAlgorithmWorker.postMessage({
      Type: MessageType.Compute,
      Generations: generations
    });
  }

  public reset() {
    if (this._GeneticAlgorithmWorker) {
      this._GeneticAlgorithmWorker.terminate();
    }
    this._GeneticAlgorithmWorker = null;
    this._GeneticAlgorithmCallback = null;
  }
}