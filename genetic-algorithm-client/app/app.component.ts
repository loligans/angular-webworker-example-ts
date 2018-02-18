import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../genetic-algorithm/candidate';
import { GeneticAlgorithm } from '../../genetic-algorithm/genetic-algorithm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private GA: GeneticAlgorithm;
  private GAWorker: Worker;
  public Columns: Array<string> = ['Rank', 'Fitness', 'Chromosome']
  public Population: Array<Candidate> = [];
  public Solution: string = "How are you gentleman? All your base are belong to us... How are you gentleman? All your base are belong to us... How are you gentleman? All your base are belong to us...";
  public PopulationSize: number = 500;
  public Generations: number = 1000;

  public getString(chars: Array<number>): string {
    return String.fromCharCode(...chars);
  }

  public startGeneticAlgorithm(): void {
    this.GA = new GeneticAlgorithm(500, this.Solution);
    this.Population = this.GA.Population.slice(0, 10);
  }

  public runGeneticAlgorithm(ga: GeneticAlgorithm) {
    console.log('Inside Web Worker')
    new Promise((resolve) => {
      ga.computeGeneration();
      console.log('Computed generation');
      // for (var i = 0; i < this.Generations; i++) {
      //   var solution = this.GA.computeGeneration();
  
      //   if (i % 2000 == 0) {
      //     this.Population = this.GA.Population.slice(0, 10);
      //   }
      //   if (solution) {
      //     break;
      //   }
      // }
    }).catch((err) => {
      console.log(err);
    });
  }
}