import { Injectable } from '@angular/core';
import { MessageType } from '../workers/string-evolver-messages';
import * as StringEvolverWorker from 'worker-loader!../../../out/string-evolver.worker.bundle.js';

@Injectable()
export class StringEvolverService {
  private _StringEvolverWorker: Worker;
  private _StringEvolverCallback: (event: MessageEvent) => void;

  public init(popSize: number, solution: string, callback: (event: MessageEvent) => void): void {
    if(this._StringEvolverWorker) {
      return;
    }
    // Initialize the worker
    this._StringEvolverWorker = new StringEvolverWorker();
    this._StringEvolverCallback = callback;
    this._StringEvolverWorker.onmessage = callback;
    
    // Intialize the String Evolver
    this._StringEvolverWorker.postMessage({
      Type: MessageType.Initialize, 
      PopulationSize: popSize, 
      Solution: solution
    });
  }

  public computeGeneration(generations: number) {
    if (!this._StringEvolverWorker) {
      return;
    }

    // Run the string evolver for the specified number of generations
    this._StringEvolverWorker.postMessage({
      Type: MessageType.Compute,
      Generations: generations
    });
  }

  public reset() {
    if (this._StringEvolverWorker) {
      this._StringEvolverWorker.terminate();
    }
    this._StringEvolverWorker = null;
    this._StringEvolverCallback = null;
  }
}