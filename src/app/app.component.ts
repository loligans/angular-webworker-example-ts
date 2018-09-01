import { Component } from '@angular/core';
import { Candidate } from 'string-evolver-ts';
import { StringEvolverService } from './services/string-evolver.service';
import { GAResult } from './workers/string-evolver-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ StringEvolverService ]
})
export class AppComponent {
  private StringEvolverService: StringEvolverService;
  public Columns: Array<string> = ['Rank', 'Fitness', 'Chromosome']
  public Solution: string = "How are you gentleman? All your base are belong to us.";
  public PopulationSize: number = 200;
  public Generations: number = 10000;
  public Progress: number = 0;
  public GenerationsPerSeconds: string = '0';
  public Population: Array<Candidate> = [];

  public FoundSolution: boolean = false;
  public Initialized: boolean = false;
  public Running: boolean = false;
  /// The current generation of the string evolver
  public Generation: number = 0;
  /// Current generation in a single run.
  public CurrentGeneration: number = 0;
  public StartTime: number;

  constructor (gaService: StringEvolverService) {
    this.StringEvolverService = gaService;
  }

  /**
   * Removes any invalid characters from a solution string.
   * @param str The string to scrub.
   */
  private scrubString(str: string): string {
    let result: string = '';
    let charCode: number;
    for(const char of str) {
      charCode = char.charCodeAt(0);
      if (charCode < Candidate.MinGene ||
          charCode > Candidate.MaxGene) {
        result += ' ';
      } else {
        result += char;
      }
    }
    return result;
  }

  /**
   * Converts an array of numbers to a string.
   * @param chars The Array<number> to convert to a string.
   */
  public getString(chars: Array<number>): string {
    return String.fromCharCode(...chars);
  }

  public startStringEvolver(): void {
    this.Running = true;
    this.Initialized = true;
    this.Solution = this.scrubString(this.Solution);
    this.StartTime = Date.now();
    this.StringEvolverService.init(this.PopulationSize, this.Solution, this.onGenerationComputed.bind(this));
    this.continueStringEvolver(this.Generations);
  }

  /**
   * Continues running the string evolver if a solution hasn't been found.
   * @param generations The numbers of generations to compute before stopping.
   */
  public continueStringEvolver(generations: number): void {
    if (this.FoundSolution) {
      return;
    }
    this.Progress = 0;
    this.CurrentGeneration = 0;
    this.StringEvolverService.computeGeneration(generations);
  }

  /**
   * Terminates the WebWorker and sets properties back to their defaults.
   */
  public resetStringEvolver(): void {
    this.StringEvolverService.reset();
    this.Running = false;
    this.Initialized = false;
    this.FoundSolution = false;
    this.Population = [];
    this.Generation = 0;
    this.Progress = 0;
    this.CurrentGeneration = 0;
    this.GenerationsPerSeconds = '0';
  }

  /**
   * Callback after WebWorker completes a number of generations.
   * @param event Object containing details about the event
   */
  public onGenerationComputed(event: MessageEvent): void {
    const result: GAResult = event.data;

    // The workers posts messages every 100 generations.
    this.CurrentGeneration += 100;
    this.Generation = result.Generation;
    this.Progress = (this.CurrentGeneration / this.Generations) * 100;

    // Update table with population
    this.Population = result.Population.slice(0, 20);
    this.FoundSolution = result.FoundSolution;
    this.Running = result.Running;

    // Calculate Generations/s
    const endTime = Date.now() - this.StartTime;
    this.GenerationsPerSeconds = `${this.Generation} - ${(this.Generation / (endTime / 1000)).toFixed(2)} Generations/s`;

    // Finish progress bar
    if(this.FoundSolution) {
      this.Progress = 100;
    }
  }
}