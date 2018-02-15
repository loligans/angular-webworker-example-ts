class Candidate {
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
class GeneticAlgorithm {
  public readonly Solution: Buffer;
  private Population: Array<Candidate>;
  private PopulationFitness: number;

  constructor(popSize: number, solution: string) {
    if (popSize % 2 === 1) popSize += 1;
    this.Solution = Buffer.from(solution, 'utf8');
    this.Population = this.generatePopulation(popSize);
  }
  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
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
      randomChar = this.randomInt(min, max);
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
  private selectParents(): Array<Candidate> {
    // Initialize the surviving parents collection
    var numParents: number = this.Population.length * .80;
    var parents = new Array<Candidate>();
    
    // Calculate the stochastic interval and starting point
    var interval: number = this.PopulationFitness / numParents;
    var startingPoint = this.randomInt(0, interval);

    // Calculate the points 
    var points = [];
    for (var i = 0; i < numParents; i++) {
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
      parents.push(this.Population[index]);
    }
    
    return parents;
  }
  private crossover(parents: Array<Candidate>): Array<Candidate> {
    // Calculate the number of children to produce
    var children = new Array<Candidate>();

    var parent1: Candidate;
    var parent2: Candidate;
    var child1: Buffer;
    var child2: Buffer;
    var crossLocation: number;
    for (var i = 0; i < parents.length; i += 2) {
      crossLocation = this.randomInt(1, this.Solution.length);
      parent1 = this.Population[i];
      parent2 = this.Population[i+1];

      // Swap genes
      child1 = Buffer.concat([
        parent1.Chromosome.slice(0, crossLocation), 
        parent2.Chromosome.slice(crossLocation)
      ], this.Solution.length);
      child2 = Buffer.concat([
        parent2.Chromosome.slice(0, crossLocation), 
        parent1.Chromosome.slice(crossLocation)
      ], this.Solution.length);

      // add children
      children.push(
        new Candidate(child1, this), 
        new Candidate(child2, this)
      );
    }

    return children;
  }
  private mutate(children: Array<Candidate>): void {
    // Chance to mutate 1/200 (.005%)
    const max: number = 50;
    const min: number = 0;

    // The allowable range of characters
    const geneMax = 127;
    const geneMin = 32;

    var mutate: boolean;
    var location: number;
    for(var child of children) {
      mutate = this.randomInt(min, max) == 0 ? true : false;
      if (mutate) {
        // Mutate the child in random location
        location = this.randomInt(0, this.Solution.length);
        child.Chromosome[location] = this.randomInt(geneMin, geneMax);
      }
    }
  }
  private selectSurvivors(): Array<Candidate> {
    const popSize: number = this.Population.length;
    const topPercentCandidates = popSize * .20;
    var survivors = new Array<Candidate>();

    for (var i = 0; i < topPercentCandidates; i++) {
      survivors.push(new Candidate(this.Population[i].Chromosome, this));
    }
    // Maybe choose a better selection method later on.
    return survivors;
  }
  private sortPopulationFitness() {
    this.PopulationFitness = 0;
    for (var candidate of this.Population) {
      this.PopulationFitness += candidate.Fitness;
    }
    this.Population.sort((a, b) => b.Fitness - a.Fitness);
  }
  public computeGeneration(): boolean {
    // Create the children of the next generation
    var parents = this.selectParents();
    var children = this.crossover(parents);
    this.mutate(children);

    // Determine who makes it to the next generation
    var survivors = this.selectSurvivors();

    // Update the population with the new children and survivors then resort
    this.Population = new Array<Candidate>(...children, ...survivors);
    this.sortPopulationFitness();

    var solution = false;
    var maxFitness = Candidate.GeneRange * this.Solution.length;
    var candidate: Candidate;
    for (var i = 0; i < this.Population.length; i++) {
      candidate = this.Population[i];
      if (candidate.Fitness >= maxFitness) {
        solution = true;
        break;
      }
    }

    // Determine if solution was found
    return solution;
  }

  public get population() : Array<Candidate> {
    return this.Population;
  }
  
}

var GA = new GeneticAlgorithm(500, "I destroy my enemy when I make him my friend. - Abraham Lincoln");
var solution = false;
for (var i = 1; i <= 10000; i++)
{
  solution = GA.computeGeneration();
  if (i % 500 === 0) {
    console.log(`Generation ${i}: ${GA.population[0].Chromosome.toString()}`)
  }
  if (solution) {
    console.log(`Generation ${i}: ${GA.population[0].Chromosome.toString()}`);
    console.log(`Solution found on generation ${i}`);
    break;
  }
}