const calculateBtn = document.getElementById('calculateBtn');
calculateBtn.onclick = () => {
    const target = document.getElementById('target').value;
    const numbersStr = document.getElementById('numbers').value;
    const givenTotal = document.getElementById('total');

    const numbers = numbersStr.split(' ').map(Number);
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    givenTotal.textContent = `givenTotal = ${sum}`;

    const resultDisplay = document.getElementById('result');
    const result = findClosestSubsequence(target, numbers);
    if(result.length !== 0) {
        const resSum = result.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        resultDisplay.textContent = `${result} = ${resSum}`;
    } else {
        resultDisplay.textContent = '计算错误';
    }
};

findClosestSubsequence = (target, numbers) => {
  numbers.sort((a, b) => a - b);
  let closestSum = Infinity;
  let closestSubsequence = [];

  function backtrack(currSum, index, subsequence) {
    if (currSum >= target && Math.abs(currSum - target) < Math.abs(closestSum - target)) {
      closestSum = currSum;
      closestSubsequence = [...subsequence];
      return;
    }
    if (index === numbers.length || currSum >= target) {
      return;
    }

    for (let i = index; i < numbers.length; i++) {
      subsequence.push(numbers[i]);
      backtrack(currSum + numbers[i], i + 1, subsequence);
      subsequence.pop();
    }
  }

  backtrack(0, 0, []);
    closestSubsequence.sort((a, b) => a - b);
  return closestSubsequence;
}
