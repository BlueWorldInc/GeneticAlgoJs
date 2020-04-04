const SOLUTION_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const CHROMOSOME_LENGTH = 10;
const POPULATION_SIZE = 100;
const TOURNAMENT_SIZE = 10;
const CROSSOVER_RATE = 0.5;
const MUTATION_RATE = 0.15;

class Individual {

    constructor() {
        //var t0 = performance.now();
        this.genome = Array(CHROMOSOME_LENGTH).fill();
        this.createGenome();
        this.fitness;
        this.calcFitness();
        //var t1 = performance.now();
        //console.log("it took " + (t1 - t0) + " ms");
    }

    createGenome() {
        for (let i = 0; i < CHROMOSOME_LENGTH; i++) {
            // this.genome.push(CHROMOSOME_LENGTH);
            this.genome[i] = this.createGene();
        }
    }

    createGene() {
        return Math.floor(Math.random() * 10);
    }

    modifyGene(index, gene) {
        this.genome[index] = gene;
    }

    calcFitness() {
        this.fitness = 0;
        for (let i = 0; i < CHROMOSOME_LENGTH; i++) {
            if (SOLUTION_SEQUENCE[i] === this.genome[i]) {
                this.fitness++;
            }
        }
    }

    getFitness() {
        return this.fitness;
    }

}

class Population {

    constructor() {
        this.genomePopulation = Array(POPULATION_SIZE).fill();
        this.createPopulation(POPULATION_SIZE);
    }

    createPopulation(populationSize) {
        for (let i = 0; i < populationSize; i++) {
            this.genomePopulation[i] = new Individual();
        }
    }

    getFittest() {
        let fittest = this.genomePopulation[0];
        for (let i = 0; i < this.genomePopulation.length; i++) {
            if (this.genomePopulation[i].getFitness() >= fittest.getFitness()) {
                fittest = this.genomePopulation[i];
            }    
        }
        return fittest;
    }

}

class GeneticAlgo {

    constructor() {

    }

    crossOver(individual1, individual2) {
        for (let i = 0; i < Math.floor(CHROMOSOME_LENGTH / 3); i++) {
            individual1.modifyGene(CHROMOSOME_LENGTH - 1 - i, individual2.genome[CHROMOSOME_LENGTH - 1 - i]);
        }
        return individual1;
    }

    getIndividual(population) {
        var individual = population.genomePopulation[this.getRandom(POPULATION_SIZE)];
        for (let i = 0; i < TOURNAMENT_SIZE; i++) {
            actualIndividual = population.genomePopulation[this.getRandom(POPULATION_SIZE)];
            if (actualIndividual.getFitness() > individual.getFitness()) {
                individual = actualIndividual;
            }
        }
        return individual;
    }

    getRandom(r) {
        return Math.floor(Math.random() * r);
    }

    mutation(individual) {
        for (let i = 0; i < CHROMOSOME_LENGTH; i++) {
            if (MUTATION_RATE > Math.random())
                individual.genome[i] = this.getRandom(CHROMOSOME_LENGTH);
        }
        return individual;
    }

}

var alpha = new Individual();
var population = new Population();
var f = population.getFittest();
console.log(f);


