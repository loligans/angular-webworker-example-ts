class Candidate {
  private readonly GeneticAlgorithm: GeneticAlgorithm;
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
class GeneticAlgorithm {
  public readonly Solution: Buffer;
  private Population: Array<Candidate>;
  private PopulationFitness: number;

  constructor(popSize: number, solution: string) {
    this.Solution = Buffer.from(solution, 'utf8');
    this.Population = this.generatePopulation(popSize);
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
  private generatePopulation(popSize: number): Array<Candidate> {
    // Initialize our population and declare chromosome and fitness.
    var population = new Array<Candidate>(popSize);
    var chromosome: Buffer;

    // Fill the population with candidates
    for(var i = 0; i < popSize; i++) {
      chromosome = this.generateChromosome(this.Solution.length);
      population[i] = new Candidate(chromosome, this);
      this.PopulationFitness += population[i].Fitness;
    }

    // Sort population by fitness
    population.sort((a, b) => b.Fitness - a.Fitness);
    return population;
  }
  private selectSurvivors(): Array<Candidate> {
    // Initialize the surviving parents collection
    var numSurvivingParents: number = 100;
    var survivingParents = new Array<Candidate>();
    
    // Calculate the stochastic interval and starting point
    var interval: number = this.PopulationFitness / numSurvivingParents;
    var startingPoint = Math.floor(Math.random() * (interval - 0) + 0);

    // Calculate the points 
    var points = [];
    for (var i = 0; i < numSurvivingParents; i++) {
      points.push(startingPoint + (i * interval));
    }

    // Stochastic universal sampling
    var fitnessSum: number = 0;
    var index: number;
    for (var p of points) {
      index = 0;
      fitnessSum = 0;
      while (fitnessSum < p) {
        fitnessSum += this.Population[index].Fitness
        index++;
      }
      survivingParents.push(this.Population[index]);
    }

    return survivingParents;
  }
  private crossover() {
    var parent1: Candidate;
    var parent2: Candidate;

    for (var i = 0; i < this.Population.length; i+=2) {
      parent1 = this.Population[i];
      parent2 = this.Population[i+1];
      console.log(parent1, parent2);
    }
  }
  private mutate(): void {
    //
  }
  private sortPopulationFitness() {
    this.PopulationFitness = 0;
    for (var candidate of this.Population) {
      this.PopulationFitness += candidate.Fitness;
    }
    this.Population.sort((a, b) => b.Fitness - a.Fitness);
  }

  public computeGeneration(): boolean {
    // this.selectSurvivors();
    this.crossover();
    this.mutate();
    // this.sortPopulationFitness();
    return true;
  }
}

var GA: GeneticAlgorithm;
GA = new GeneticAlgorithm(500, "hello");
