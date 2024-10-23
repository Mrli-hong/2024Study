const inputs = [
    {
        "id": "A",
        "value": 10,
    },
    {
        "id": "B",
        "value": 15,
    },
    {
        "id": "C",
        "value": 20,
    },
    {
        "id": "D",
        "operator": "-",
        "refs": ["C", "B"],
    },
    {
        "id": "E",
        "operator": "+",
        "refs": ["A", "B"],
    },
    {
        "id": "F",
        "operator": "*",
        "refs": ["C", "D"],
    },
]
// [10,15,20,5,25,100]

function getValue(node, inputs) {
    if (node.operator) {
        const refs = node.refs.map(id => {
            const refNode = inputs.find(i => i.id === id)
            return getValue(refNode, inputs)
        })
        switch (node.operator) {
            case "+":
                return refs.reduce((a, b) => a + b)
            case "-":
                return refs.reduce((a, b) => a - b)
            case "*":
                return refs.reduce((a, b) => a * b)
            case "/":
                return refs.reduce((a, b) => a / b)
        }
    } else {
        return node.value
    }
}
function calculate(inputs) {
    const outputs = []
    inputs.forEach(node => {
        outputs.push(getValue(node, inputs))
    })
    return outputs
}

console.log(calculate(inputs))