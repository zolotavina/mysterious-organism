// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      // Mutate a random base in the DNA strand
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];

      let newBase = returnRandBase();
      while (newBase === currentBase) {
        newBase = returnRandBase();
      }

      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherObj) {
      // Compare DNA similarity between two specimens
      let identicalBase = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherObj.dna[i]) {
          identicalBase++;
        }
      }

      const percentage = Math.round((identicalBase / this.dna.length) * 100);

      console.log(
        `Specimen #${this.specimenNum} and specimen #${otherObj.specimenNum} have ${percentage}% DNA in common`
      );

      return percentage;
    },
    willLikelySurvive() {
      // Check if the specimen is likely to survive
      let countCandG = 0;

      this.dna.forEach((base) => {
        if (base === "C" || base === "G") {
          countCandG++;
        }
      });

      let percentageCandG = (countCandG / this.dna.length) * 100;

      // console.log(`Percentage of 'C' and 'G': ${percentageCandG}%`);

      return percentageCandG >= 60;
    },
    complementStrand() {
      // Generate the complementary DNA strand
      console.log(this.dna);
      let complementStr = [];

      this.dna.forEach((base) => {
        switch (base) {
          case "A":
            complementStr.push("T");
            break;
          case "T":
            complementStr.push("A");
            break;
          case "C":
            complementStr.push("G");
            break;
          case "G":
            complementStr.push("C");
            break;
          default:
            console.log("Invalid base");
        }
      });

      return complementStr;
    },
  };
};

// Generate 30 instances of pAequor that are likely to survive
let pAequorSurvivors = [];
let idCounter = 1;

while (pAequorSurvivors.length < 30) {
  const newAequor = pAequorFactory(idCounter, mockUpStrand());

  if (newAequor.willLikelySurvive()) {
    pAequorSurvivors.push(newAequor);
  }

  idCounter++;
}

console.log(pAequorSurvivors);

// Find the two most related instances
let mostRelated1;
let mostRelated2;
let highestPercentage = 0;

for (let i = 0; i < pAequorSurvivors.length; i++) {
  for (let j = i + 1; j < pAequorSurvivors.length; j++) {
    const currentPercentage = pAequorSurvivors[i].compareDNA(pAequorSurvivors[j]);

    if (currentPercentage > highestPercentage) {
      highestPercentage = currentPercentage;
      mostRelated1 = pAequorSurvivors[i];
      mostRelated2 = pAequorSurvivors[j];
    }
  }
}

console.log(`The two most related instances are #${mostRelated1.specimenNum} and #${mostRelated2.specimenNum} with ${highestPercentage}% DNA in common.`);