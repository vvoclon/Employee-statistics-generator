const gender = ['male', 'female'];
const workload = [10, 20, 30, 40] 
const femaleFirstNames = [
    "Adriana", "Alena", "Alexandra", "Alice", "Amelia",
    "Barbora", "Blanka", "Dagmar", "Dominika", "Elena",
    "Eliška", "Emília", "Eva", "Gabriela", "Hana",
    "Helena", "Irena", "Jana", "Jaroslava", "Jarmila",
    "Kamila", "Karolína", "Katarína", "Klára", "Kristína",
    "Lenka", "Linda", "Lucia", "Ludmila", "Magdaléna",
    "Mária", "Marie", "Markéta", "Martina", "Michaela",
    "Monika", "Natalie", "Nela", "Nikola", "Olga",
    "Patrícia", "Petra", "Radka", "Renáta", "Simona",
    "Soňa", "Veronika", "Zuzana"
  ];
  const maleFirstNames = [
    "Adam", "Aleš", "Alexandr", "Alois", "Andrej",
    "Anton", "Bohumil", "Bohuslav", "Branislav", "David",
    "Dominik", "Dušan", "Emil", "Filip", "František",
    "Gabriel", "Jakub", "Ján", "Jaromír", "Jaroslav",
    "Jiří", "Josef", "Juraj", "Karel", "Karol",
    "Ladislav", "Lukáš", "Marek", "Martin", "Matúš",
    "Michal", "Milan", "Ondrej", "Patrik", "Pavel",
    "Peter", "Radim", "Radek", "Richard", "Robert",
    "Roman", "Šimon", "Stanislav", "Tomáš", "Václav",
    "Viktor", "Vladimír", "Zdeněk"
  ];
const femaleSurnames = [
    "Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková",
    "Kučerová", "Marešová", "Šimková", "Havlová", "Lišková",
    "Králová", "Němcová", "Pospíšilová", "Machová", "Říhová",
    "Benešová", "Horáková", "Konečná", "Malá", "Tomášová",
    "Kolářová", "Fialová", "Veselá", "Urbanová", "Zemanová",
    "Kovaříková", "Holubová", "Štěpánová", "Vlčková", "Křížová",
    "Káňová", "Hrušková", "Novotná", "Dubová", "Kočová",
    "Richterová", "Sýkorová", "Petrášová", "Žáková", "Kudláčková",
    "Jelínková", "Vojtová", "Blažková", "Šťastná", "Mikulášová",
    "Moravcová", "Kratochvílová"
  ];
  const maleSurnames = [
    "Novák", "Svoboda", "Dvořák", "Černý", "Procházka",
    "Kučera", "Mareš", "Šimek", "Havel", "Liška",
    "Kráľ", "Němec", "Pospíšil", "Mach", "Říha",
    "Beneš", "Horák", "Konečný", "Malý", "Tomáš",
    "Kolář", "Fiala", "Veselý", "Urban", "Zeman",
    "Kovařík", "Holub", "Štěpánek", "Vlček", "Kříž",
    "Káňa", "Hruška", "Novotný", "Dub", "Koč",
    "Richter", "Sýkora", "Petráš", "Žák", "Kudláček",
    "Jelínek", "Vojta", "Blážek", "Šťastný", "Mikuláš",
    "Moravec", "Kratochvíl"
  ]; 


  function getRandomBirthdate(minAge, maxAge) {
    const today = new Date();
    const minBirthdate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxBirthdate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  
    const randomBirthdate = new Date(
      minBirthdate.getTime() + Math.random() * (maxBirthdate.getTime() - minBirthdate.getTime())
    );
  
    return randomBirthdate;
  }

function generateEmployeeData(dtoIn) {
  const dtoOut = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const randomGender = gender[Math.floor(Math.random() * gender.length)];
    const randomWorkload = workload[Math.floor(Math.random() * workload.length)];
  
    let firstName, lastName;
  
    if (randomGender === "male") {
      firstName = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
      lastName = maleSurnames[Math.floor(Math.random() * maleSurnames.length)];
    } else {
      firstName = femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
      lastName = femaleSurnames[Math.floor(Math.random() * femaleSurnames.length)];
    }
  
    const randomBirthdate = getRandomBirthdate(dtoIn.age.min, dtoIn.age.max);

    const employee = {
      gender: randomGender,
      birthdate: randomBirthdate,
      name: firstName,
      surname: lastName,
      workload: randomWorkload
     };

    dtoOut.push(employee);
  }

  return dtoOut;
}

// Example usage:
const dtoIn = {
  count: 5,
  age: {
    min: 19,
    max: 35
  }
};

// creating variables
const result = generateEmployeeData(dtoIn);
let workloadList = [];
let ageList = [];
let workloadWomen = [];


// creating a function get statistics
function generateEmployeeStatistics(result) {
    let dtoOut = {};
    dtoOut["total"] = dtoIn.count;

     // creating count median function
     function countMedian(arr) {
        arr.sort((a, b) => a - b);
        const middleIndex = Math.floor(arr.length / 2);
        if (arr.length % 2 === 0) {
            return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
        } else {
            return arr[middleIndex];
        }
    }

    // adding the workload to workloadList
    for (let i=0; i < result.length; i++) {
        workloadList.push(result[i].workload);
        // defining the age variable
        let monthDiff = Date.now() - result[i].birthdate.getTime();
        let ageDate = new Date(monthDiff);
        let year = ageDate.getFullYear();
        let age = Math.abs(year - 1970);
        ageList.push(age);

        if (result[i].gender === "female") {
            workloadWomen.push(result[i].workload);
        }
    };

    // adding the necessary values to the output dictionary
    dtoOut["workload10"] = workloadList.filter((element) => element === 10).length;
    dtoOut["workload20"] = workloadList.filter((element) => element === 20).length;
    dtoOut["workload30"] = workloadList.filter((element) => element === 30).length;
    dtoOut["workload40"] = workloadList.filter((element) => element === 40).length;
    dtoOut["averageAge"] = ageList.reduce((a, b) => a + b, 0) / ageList.length;
    dtoOut["minAge"] = Math.min(...ageList);
    dtoOut["maxAge"] = Math.max(...ageList);
    dtoOut["medianAge"] = countMedian(ageList);
    dtoOut["medianWorkload"] = countMedian(workloadList);
    dtoOut["averageWomenWorkload"] = workloadWomen.reduce((a, b) => a + b, 0) / workloadWomen.length;
    dtoOut["sortedByWorkload"] = result.sort((a, b) => a.workload - b.workload);
    
    return dtoOut;
    
}

// creating the main function
function main(dtoIn) {
    return generateEmployeeStatistics(generateEmployeeData(dtoIn));
};
console.log(JSON.stringify(main(dtoIn), null, 2));
