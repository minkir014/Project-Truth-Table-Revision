var xlsx = require('xlsx'),
    truthTable = xlsx.readFile('Truth-Table.xlsx'),
    sheet = truthTable.Sheets[truthTable.SheetNames[1]];
// var sixVariables = [0, 0, 0, 0];

for (let i = 2; i <= 257; i++) {
    let index = i.toString();
    let B = (Math.pow((-1), sheet['C' + index].v)) * (sheet['E' + index].v * 2 + sheet['F' + index].v);
    let A = (Math.pow((-1), sheet['D' + index].v)) * (sheet['G' + index].v * 2 + sheet['H' + index].v);
    let expresult = 0;
    let zeroFlag = 0;
    let actresult = Math.pow((-1), sheet['K' + index].v) * (sheet['L' + index].v + sheet['M' + index].v * 2 + sheet['N' + index].v * 4 + sheet['O' + index].v * 8);
    let sign = 0;
    let divByZero = 0;
    if (i <= 193) {
        if (i <= 65) {
            expresult = A + B;
        }
        else if (i > 65 && i <= 129) {
            expresult = A - B;
        }
        else if (i > 129 && i <= 193) {
            expresult = A * B;
        }
        if (expresult === 0) {
            zeroFlag = 1;
            sign = 0;
        }
        else {
            sign = - 0.5 * (expresult / Math.abs(expresult)) + 0.5;
        }
    }

    if (i > 193) {
        if (B == 0) {
            expresult = 0;
            divByZero = 1;
            zeroFlag = 1;
        }
        else {
            let signOFA = Math.pow((-1), sheet['D' + index].v);
            sign = -0.5 * signOFA + 0.5;
            expresult = signOFA *  Math.abs(A % B);
            if (expresult === 0) {
                zeroFlag = 1;
                sign = 0;
            }
        }
    }
    if (!(expresult === actresult && divByZero === sheet['I' + index].v
        && sign === sheet['K' + index].v && zeroFlag === sheet['J' + index].v)) {
        console.log('There is a Problem in line ' + i.toString());
    }
    // for (j = 3; j >= 0; j--) {
    //     if (sixVariables[j] == 1) {
    //         sixVariables[j] = 0;
    //     }
    //     else {
    //         sixVariables[j]++;
    //         break;
    //     }
    // }
}