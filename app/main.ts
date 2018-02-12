interface Candidate {
  chromosome: Buffer;
  fitness: number;
}
enum CrossoverMethod {
  SinglePoint,
  DoublePoint,
  Uniform,
  ThreeParent,
  All
}
class GeneticAlgorithm {
  private Population: Array<Candidate>;
  private Solution: Buffer;
  private Crossover: CrossoverMethod;

  constructor(popSize: number, solution: string, crossMethod: CrossoverMethod) {
    this.Solution = Buffer.from(solution);
    this.Crossover = CrossoverMethod.SinglePoint;
    this.Population = this.generatePopulation(popSize);
  }
  private generatePopulation(popSize: number): Array<Candidate> {
    // Initialize our population and declare chromosome and fitness.
    var population = new Array<Candidate>(popSize);
    var chromosome: Buffer;
    var fitness: number;

    // Fill the population with candidates
    for(var i = 0; i < popSize; i++) {
      chromosome = this.generateChromosome(this.Solution.length);
      fitness = this.calculateFitness(chromosome);
      population[i] = { chromosome, fitness };
    }
    return population;
  }
  private generateChromosome(length: number): Buffer {
    // The allowable range of characters
    const max = 127;
    const min = 32;

    // Build the chromosome
    var randomChromosome: string = '';
    var randomChar: number;
    for (var i = 0; i < length; i++)
    {
      randomChar = Math.floor(Math.random() * (max - min) + min);
      randomChromosome += String.fromCharCode(randomChar);
    }

    // Returns the chromosome as a buffer
    return Buffer.from(randomChromosome, 'utf8');
  }
  private calculateFitness(chromosome: Buffer): number {
    // Start at perfect fitness
    const geneRange: number = 94;
    var fitness = geneRange * this.Solution.length;

    // Declare the genes
    var chromosomeGene: number;
    var solutionGene: number;

    // Determine the fitness of every gene
    for (var i = 0; i < this.Solution.length; i++) {
      chromosomeGene = chromosome[i];
      solutionGene = this.Solution[i];
      fitness -= Math.abs(solutionGene - chromosomeGene);
    }
    return fitness;
  }
  private selectParents(): Array<Candidate> {
    return null;
  }
  private crossover(method: CrossoverMethod): void {
    switch (method) {
      case CrossoverMethod.SinglePoint:
      {
        break;
      }
      case CrossoverMethod.DoublePoint:
      {
        break;
      }
      case CrossoverMethod.Uniform:
      {
        break;
      }
      case CrossoverMethod.ThreeParent:
      {
        break;
      }
      case CrossoverMethod.All:
      {

      }
    }
  }
  private mutate(): void {

  }
  private selectSurvivors(): Array<Candidate> {
    return null;
  }
  public computeGeneration(): boolean {
    this.selectParents();
    this.crossover(this.Crossover);
    this.mutate();
    this.selectSurvivors();
    return true;
  }
}

const GA = new GeneticAlgorithm(10, "hello00", CrossoverMethod.SinglePoint);
var solution: boolean = false;
do {
  solution = GA.computeGeneration();
} while (!solution)