import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../genetic-algorithm/src/candidate';
import { GeneticAlgorithm } from '../../../genetic-algorithm/src/genetic-algorithm';
import { GeneticAlgorithmService } from './services/genetic-algorithm.service';
import { GAResult } from './workers/genetic-algorithm-messages';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GeneticAlgorithmService ]
})
export class AppComponent {
  private GeneticAlgorithmService: GeneticAlgorithmService;
  public Columns: Array<string> = ['Rank', 'Fitness', 'Chromosome']
  /// The solution string the genetic algorithm is looking for
  public Solution: string = "How are you gentleman? All your base are belong to us.";
  /// Determines the size of the genetic algorithm population
  public PopulationSize: number = 500;
  /// The number of generations to compute before stopping
  public Generations: number = 10000;
  /// Stores the progress of the genetic algorithm for a single run
  public Progress: number = 0;
  /// True if the GeneticAlgorithmService found a solution
  public FoundSolution: boolean = false;
  /// True if the GeneticAlgorithmService is initialized
  public Initialized: boolean = false;
  /// True if the GeneticAlgorithmService is running
  public Running: boolean = false;
  /// The current generation of the genetic algorithm
  public Generation: number = 0;
  /// Current generation in a single run.
  public CurrentGeneration: number = 0;
  /// The list of candidates to display in the table
  public Population: Array<Candidate> = [];
  

  constructor (gaService: GeneticAlgorithmService) {
    this.GeneticAlgorithmService = gaService;
  }

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

  public getString(chars: Array<number>): string {
    return String.fromCharCode(...chars);
  }

  public startGeneticAlgorithm(): void {
    this.Running = true;
    this.Initialized = true;
    this.Solution = this.scrubString(this.Solution);
    this.GeneticAlgorithmService.init(this.PopulationSize, this.Solution, this.onGenerationComputed.bind(this));
    this.continueGeneticAlgorithm();
  }

  public continueGeneticAlgorithm() {
    if (this.FoundSolution) {
      return;
    }
    this.Progress = 0;
    this.CurrentGeneration = 0;
    this.GeneticAlgorithmService.computeGeneration(this.Generations);
  }

  public resetGeneticAlgorithm() {
    this.GeneticAlgorithmService.reset();
    this.Running = false;
    this.Initialized = false;
    this.FoundSolution = false;
    this.Population = [];
    this.Generation = 0;
    this.Progress = 0;
    this.CurrentGeneration = 0;
  }

  public onGenerationComputed(event: MessageEvent): void {
    const result: GAResult = event.data;
    this.CurrentGeneration += 100;
    this.Generation = result.Generation;
    this.Progress = (this.CurrentGeneration / this.Generations) * 100;
    this.Population = result.Population.slice(0, 20);
    this.FoundSolution = result.FoundSolution;
    this.Running = result.Running;

    if(this.FoundSolution) {
      this.Progress = 100;
    }
  }
}