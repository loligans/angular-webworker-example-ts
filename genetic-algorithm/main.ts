import { Candidate } from './candidate';
import { GeneticAlgorithm } from './genetic-algorithm';

const solution = 'This is the string the genetic algorithm is looking for.';
const GA = new GeneticAlgorithm(500, solution);
var foundSolution: boolean;
for (var i = 0; i < 20000; i++)
{
  foundSolution = GA.computeGeneration();
  if (i % 20 === 0) {
    console.log(`Generation ${i}: ${GA.Population[0].Chromosome.toString()}`);
  }
  if (foundSolution) {
    console.log(`Generation ${i}: ${GA.Population[0].Chromosome.toString()}`);
    console.log(`It took ${i} generations to the solution!`);
    break;
  }
}
