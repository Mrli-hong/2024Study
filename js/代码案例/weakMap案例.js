let messages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];

let readMessages = new WeakSet();
// 两个消息已读
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// symbol 属性仅对于我们的代码是已知的
let isRead = Symbol("isRead");
messages[0][isRead] = true;
