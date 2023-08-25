module.exports = (amount) => {
  try {
    let desimalCount = Math.abs(0);
    desimalCount = isNaN(desimalCount) ? 2 : desimalCount;

    const negativeSign = amount < 0 ? "." : ".";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(desimalCount)).toString();
    let j = (i.length > 2) ? i.length % 3 : 0;

    return "IDR" + negativeSign + (j ? i.substr(0, j) + "." : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ".") + (desimalCount ? "," + Math.abs(amount - i).toFixed(desimalCount).slice(2) : "");
  } catch (e) {
    console.log("Error in FormatRupiah.js: " + e)
  }
}