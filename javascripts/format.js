function format(p1, p2) {
    if (Math.abs(p1) < 1000) {
         return p1.toFixed(p2);
    }
    else if (p1 >= 1000) {
        let power = Math.floor(Math.log10(p1));
        let mantissa = p1 / Math.pow(10, power);
        return mantissa.toFixed(2) + "e" + power;
    }
    else {
        let power = Math.floor(Math.log10(Math.abs(p1)));
        let mantissa = Math.abs(p1) / Math.pow(10, power);
        return "-" + mantissa.toFixed(2) + "e" + power;
    }
}

/*function formatDown(p1, p2) {
    if (Math.abs(p1) < 1000) {
        return Math.floor(p1);
    }
    else if (p1 >= 1000) {
        let power = Math.floor(Math.log10(p1));
        let mantissa = p1 / Math.pow(10, power);
        return mantissa.toFixed(2) + "e" + power;
    }
    else {
        let power = Math.floor(Math.log10(Math.abs(p1)));
        let mantissa = Math.abs(p1) / Math.pow(10, power);
        return "-" + mantissa.toFixed(2) + "e" + power;
    }
} */
