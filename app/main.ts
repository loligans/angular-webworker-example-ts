interface Candidate {
  chromosome: Buffer;
  fitness: number;
}
class GeneticAlgorithm {
  private Population: Array<Candidate>;
  private Solution: string;

  constructor(popSize: number, solution: string) {
    this.Solution = solution;
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
      this.Population[i] = { 
        chromosome: chromosome,
        fitness: fitness
      }
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
      randomChar = Math.floor(Math.random() * (max - min + 1) + min);
      randomChromosome += String.fromCharCode(randomChar);
    }

    // Returns the chromosome as a buffer
    return Buffer.from(randomChromosome, 'utf8');
  }

  private calculateFitness(chromosome: Buffer): number {
    // Some mathematical formula to calculate fitness
    return 0.0
  }
}

const GA = new GeneticAlgorithm(500, "hello");