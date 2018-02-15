import { GeneticAlgorithm } from './genetic-algorithm';
export class Candidate {
  private readonly GeneticAlgorithm: GeneticAlgorithm;
  public static readonly GeneRange: number = 94;
  public readonly Chromosome: Buffer;
  public readonly Fitness: number;

  constructor(chromosome: Buffer, geneticAlgorithm: GeneticAlgorithm) {
    this.GeneticAlgorithm = geneticAlgorithm;
    this.Chromosome = chromosome;
    this.Fitness = this.calculateFitness();
  }
  private calculateFitness(): number {
    // Start at perfect fitness
    const geneRange: number = 94;
    var fitness = geneRange * this.GeneticAlgorithm.Solution.length;

    // Declare the genes
    var chromosomeGene: number;
    var solutionGene: number;

    // Determine the fitness of every gene
    for (var i = 0; i < this.GeneticAlgorithm.Solution.length; i++) {
      chromosomeGene = this.Chromosome[i];
      solutionGene = this.GeneticAlgorithm.Solution[i];
      fitness -= Math.abs(solutionGene - chromosomeGene);
    }

    return fitness;
  }
}