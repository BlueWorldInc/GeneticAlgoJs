const SOLUTION_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const CHROMOSOME_LENGTH = 10;
const MAX_FITNESS = 10;
const POPULATION_SIZE = 100;
const TOURNAMENT_SIZE = 5;
const CROSSOVER_RATE = 0.50;
const MUTATION_RATE = 0.15;

const BINARY_LENGTH = 10;
const MAX_RANGE = 10;

class Individual {

    constructor() {
        //var t0 = performance.now();
        this.fitness;
        this.genome = Array(CHROMOSOME_LENGTH).fill();
        this.createGenome();
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

class IndividualForDouble {

    constructor() {
        this.fitness;
        this.genome = Array(BINARY_LENGTH).fill();
        this.createGenome();
        this.calcFitness();
    }

    createGenome() {
        for (let i = 0; i < BINARY_LENGTH; i++) {
            this.genome[i] = this.createGene();
        }
    }

    createGene() {
        return Math.round(Math.random());
    }

    modifyGene(index, gene) {
        this.genome[index] = gene;
    }

    binaryToDouble() {
        let double = 0;
        for (var i = 0; i < BINARY_LENGTH; i++) {
            double += this.genome[i] * Math.pow(2, (BINARY_LENGTH - i - 1));
        }
        double = double / 1024;
        return double;
    }

    calcFitness() {
        this.fitness = 0;
        let x = this.binaryToDouble() * MAX_RANGE;
        this.fitness = (Math.sin(x) * ((x - 2) * (x - 2)) + 3);
    }

    getFitness() {
        return this.fitness;
    }

}

class Population {

    constructor(populationSize) {
        this.genomePopulation = Array(populationSize).fill();
        this.createPopulation(populationSize);
    }

    createPopulation(populationSize) {
        for (let i = 0; i < populationSize; i++) {
            this.genomePopulation[i] = new IndividualForDouble();
        }
    }

    getFittest() {
        let fittest = this.genomePopulation[0];
        for (let i = 0; i < this.genomePopulation.length; i++) {
            // console.log(this.genomePopulation.length);
            // console.log(this.genomePopulation);
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

        let newIndividual = new IndividualForDouble();

        for (let i = 0; i < CHROMOSOME_LENGTH; i++) {
            if (Math.random() <= CROSSOVER_RATE) {
                newIndividual.genome[i] = individual1.genome[i];
            } else {
                newIndividual.genome[i] = individual2.genome[i];
            }
        }
        return newIndividual;
    }

    randomSelection(population) {
        let newTournamentPopulation = new Population(TOURNAMENT_SIZE);
        for (let i = 0; i < TOURNAMENT_SIZE; i++) {
            let randomIndex = Math.floor(Math.random() * POPULATION_SIZE);
            newTournamentPopulation.genomePopulation[i] = population.genomePopulation[randomIndex];
        }
        let fittestIndividual = newTournamentPopulation.getFittest();
        return fittestIndividual;
    }

    getNewPopulation(population) {

        let newPopulation = new Population(POPULATION_SIZE);

        for (let i = 0; i < POPULATION_SIZE; i++) {
            let individual1 = this.randomSelection(population);
            let individual2 = this.randomSelection(population);
            individual1 = this.crossOver(individual1, individual2);
            individual1.calcFitness();
            newPopulation.genomePopulation[i] = individual1;
        }

        for (let i = 0; i < POPULATION_SIZE; i++) {
            let individual = population.genomePopulation[i];
            individual = this.mutation(individual);
            individual.calcFitness();
            population.genomePopulation[i] = individual;
        }

        return newPopulation;
    }

    getRandom(r) {
        return Math.floor(Math.random() * r);
    }

    mutation(individual) {
        for (let i = 0; i < CHROMOSOME_LENGTH; i++) {
            if (MUTATION_RATE >= Math.random())
                individual.genome[i] = this.getRandom(CHROMOSOME_LENGTH);
        }
        return individual;
    }

}

////////////////////////////ALGO 1////////////////////////////////////////
/*
var population = new Population(100);
var algo = new GeneticAlgo();
var safe = 0;

// console.log(algo);

while (population.getFittest().fitness !== MAX_FITNESS && safe < 100) {
    population = algo.getNewPopulation(population);
    console.log(population.getFittest().fitness);
    console.log(population.getFittest().genome.toString());
    safe++;
}
*/

////////////////////////////ALGO 2////////////////////////////////////////
// let fn = new IndividualForDouble();
// console.log(fn.genome.toString());
// console.log(fn.binaryToDouble() * MAX_RANGE);
// console.log(fn.fitness);



var population = new Population(100);
var algo2 = new GeneticAlgo();
var generation = 0;

while (generation < 10) {
    population = algo2.getNewPopulation(population);
    console.log("Generation: " + generation);
    console.log("Fittest individual Genotype: " + population.getFittest().genome.toString());
    console.log("Fittest individual Value: " + population.getFittest().binaryToDouble() * MAX_RANGE);
    console.log("Fittest individual Fitness: " + population.getFittest().fitness);
    generation++;
}
