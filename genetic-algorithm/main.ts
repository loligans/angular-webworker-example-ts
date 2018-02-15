import { Candidate } from './candidate';
import { GeneticAlgorithm } from './genetic-algorithm';

const GA = new GeneticAlgorithm(500, 'This is the string we are looking for!');
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
