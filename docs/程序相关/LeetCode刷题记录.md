有时候刷过的题，可能过段时间就忘记怎么写了。

复习真的十分重要，所以这篇文章会陆续的把写过的题**重新整理**，**分析**，**总结经验**。

## 链表

### 206. 反转链表

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

<img src="https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg" style={{zoom: "67%"}} />

**题目链接**：https://leetcode-cn.com/problems/reverse-linked-list/

**推荐视频讲解**：https://leetcode-cn.com/problems/reverse-linked-list/solution/shi-pin-jiang-jie-die-dai-he-di-gui-hen-hswxy/

#### 1. 快慢指针

将后一个节点指向前一个节点

```tsx
function reverseList(head: ListNode | null): ListNode | null {
  let newNode = null
  let cur = head
  while (cur !== null) {
    let next = cur.next
    cur.next = newNode
    newNode = cur
    cur = next
  }
  return newNode
}
```

#### 2. 递归

```tsx
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head
  let newNode = reverseList(head.next)
  head.next.next = head
  head.next = null
  return newNode
}
```

这张关于本题递归方法的图示非常好：

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/04/21-13-34-40-image-20220421133432756.png" alt="image-20220421133432756" style={{zoom: "67%"}} />

### [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

给你一个链表的头节点 head ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

如果链表中存在环 ，则返回 true 。 否则，返回 false 。

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png" style={{zoom: "67%"}} />

#### 1. HashMap

遍历这个链表，如果当前节点在 hashMap 中不存在，则将当前节点存入 hashMap ，如果当前节点在 hashMap 中存在，则存在环。

注意：当前节点 与 hashMap 中的值比较时，并不是比较节点的值，而是比较这个节点是否相同。

```typescript
function hasCycle(head: ListNode | null): boolean {
  if (head === null) return false
  let cur = head
  const nodeMap: Map<ListNode, number> = new Map()
  while (cur.next) {
    if (nodeMap.has(cur.next)) return true
    nodeMap.set(cur.next, 1)
    cur = cur.next
  }
  return false
}
```

#### 2. 快慢指针

慢指针每次移动 1 个位置，快指针每次移动 2 个位置，如果链表有环，快指针会和慢指针相遇，如果无环，快指针永远在慢指针前面，不会相遇。

```typescript
function hasCycle(head: ListNode | null): boolean {
  if (head === null) return false
  let slow: ListNode = head
  let fast: ListNode = head
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next as ListNode
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}
```

### [142. 环形链表 2](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

这道题与上一道 141.环形链表 的区别是，本题不仅要判断时候有环，还要返回**入环节点的 index**。

### 136. 只出现 1 次的数字

#### 1. 快慢指针

同样使用快慢指针来判断该链表是否有环。

那么，如何找到入环的节点呢？方法是，当快慢指针在环内相遇时，将快指针或慢指针移动到该链表的头节点，然后让快慢指针每次同时移动 1 个节点，当下次快慢指针相遇时，它们指向的节点就是入环节点。

<img src="https://assets.leetcode-cn.com/solution-static/142/142_fig1.png" alt="fig1" style={{zoom: "67%"}} />

可以推出 **a=c+(n−1)(b+c)** 的等量关系，我们会发现：从相遇点到入环点的距离加上 n−1 圈的环长，恰好等于从链表头部到入环点的距离。

具体推导过程：https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/huan-xing-lian-biao-ii-by-leetcode-solution/

```typescript
function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null) return null
  let slow: ListNode | null | undefined = head
  let fast: ListNode | null | undefined = head
  let loopExists = false
  while (fast.next && fast.next.next) {
    slow = slow.next as ListNode
    fast = fast?.next?.next
    if (slow === fast) {
      loopExists = true
      break
    }
  }
  if (loopExists) {
    slow = head
    while (slow !== fast) {
      slow = slow?.next
      fast = fast?.next
    }
    return slow
  }
  return null
}
```

### 160. 相交链表

给你两个单链表的头节点 `headA` 和 `headB` ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 `null` 。

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png" style={{zoom: "67%"}} />

#### 1. 循环双指针

由于两条链表的长度不同，~~当指针的 next 为 null 时~~ **当指针指向的节点为 null**，将这个指针指向另一条链表的头节点，另一个指针不变。循环 n 次后总会在相交节点相遇，退出循环。

这种方法很好理解，代码量也少，但是效率比较低。

**为什么会相遇？** 如上图存在相交节点，

A 指针走过的路程为 = ` 2 + 相交后的链表长度 + 3 + 相交后的链表长度` + ···

B 指针走过的路程为 = `3 + 相交后的链表长度 + 2 + 相交后的链表长度` + ···

当两个指针走过的路程相同时（两指针相遇），此处即为相交节点。

**为什么不能在相交节点之后相遇？**

指针的移动速度是相同的，如果没有在相交节点相遇，那么在相交节点之后也不会相遇。

**如果判定链表没有相交？**

依然执行上述流程，如果没有相交，那么两个指针不会相遇，但两个指针最后指向的节点（每条链表最后的 next ） 一定为 null，pA = pB ，则跳出循环，返回 null。

```typescript
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (headA === null || headB === null) return null
  let pA: ListNode | null = headA
  let pB: ListNode | null = headB
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next
    pB = pB === null ? headA : pB.next
  }
  return pA
}
```

#### 2. 双指针（高效）

先使用双指针分别遍历两个链表的长度，然后计算出两个链表的长度差 d 。先让较长的链表的指针移动 d 个节点，然后再分别让两个指针移动 n 次，当两个指针相遇时，则为相交节点。如果两个链表没有相交，则最后两个指针指向 null ，跳出循环，返回 null。

这种方法也很好理解，效率也很高，就是代码量有点大...

```typescript
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (headA === null || headB === null) return null
  let pA: ListNode | null = headA
  let pB: ListNode | null = headB
  let lenA: number = 0
  let lenB: number = 0
  let diff: number = 0

  //计算A长度
  while (pA !== null) {
    lenA++
    pA = pA.next
  }

  //计算B长度
  while (pB !== null) {
    lenB++
    pB = pB.next
  }

  //计算差值
  diff = lenA - lenB

  //重置指针
  pA = headA
  pB = headB

  //较长链移动 diff 个位置
  if (diff > 0) {
    while (diff > 0) {
      pA = pA.next as ListNode
      diff--
    }
  } else {
    while (diff < 0) {
      pB = pB.next as ListNode
      diff++
    }
  }

  //两个指针同时移动
  while (pA !== null && pB !== null) {
    if (pA === pB) return pA
    pA = pA.next
    pB = pB.next
  }
  return null
}
```

### 136. 只出现 1 次的数字

---

### 234. 回文链表

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

```
输入：head = [1,2,2,1]
输出：true
```

![img](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

https://leetcode-cn.com/problems/palindrome-linked-list/

#### 1. 利用数组反转

创建一个数组，将链表的值推进去，再通过反转数组，对比前后数组是否相同即可判断。

```typescript
function isPalindrome(head: ListNode | null): boolean {
  let arr = []
  while (head !== null) {
    arr.push(head.val)
    head = head.next
  }
  // 注意 reverse() 方法的使用，会改变原数组
  let reverse = [...arr].reverse()

  return arr.join('') === reverse.join('')
}
```

注意：`reverse()` 会改变数组本身。

#### 2. 快慢指针，反转后半部分链表

```typescript
function isPalindrome2(head: ListNode | null): boolean {
  if (head === null) return false
  let slow: ListNode | null = head
  let fast: ListNode | null = head

  //偶数情况
  while (fast !== null && fast.next !== null) {
    slow = slow.next as ListNode
    fast = fast.next.next as ListNode
  }

  //如果是奇数，此时slow指向正中间，fast 指向 末尾节点
  while (fast !== null) {
    slow = slow.next as ListNode
    fast = fast.next
  }

  //反转后半部分 206.反转链表
  let newNode = null
  while (slow !== null) {
    let temp: ListNode | null = slow.next
    slow.next = newNode
    newNode = slow
    slow = temp
  }

  //比较前后两个链表是否相等
  fast = head
  slow = newNode
  while (slow !== null) {
    if (fast?.val !== slow?.val) return false
    fast = fast?.next as ListNode
    slow = slow?.next
  }
  return true
}
```

### [剑指 Offer 22. 链表中倒数第 k 个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

输入一个链表，输出该链表中倒数第 k 个节点。为了符合大多数人的习惯，本题从 1 开始计数，即链表的尾节点是倒数第 1 个节点。

例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

### 415. 字符串相加

给定两个字符串形式的非负整数 num1 和 num2 ，计算它们的和并同样以字符串形式返回。

你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

```js
输入：num1 = "11", num2 = "123"
输出："134"
```

```typescript
function addStrings(num1: string, num2: string): string {
  let i = num1.length - 1
  let j = num2.length - 1
  let up = 0
  let res = []
  while (i >= 0 || j >= 0 || up !== 0) {
    //如果位数不足就补零 charAt 如果超出返回则返回空字符串
    // 当 i = 0 时，取的时 字符串第一位数字
    const x = i >= 0 ? +num1.charAt(i) : 0
    const y = j >= 0 ? +num2.charAt(j) : 0

    const sum = x + y + up
    res.push(sum % 10)

    // sum/10  在 0 - 18 之间 up 的取值为 0 或 1
    up = Math.floor(sum / 10)
    i--
    j--
  }

  return res.reverse().join('')
}

console.log(addStrings('26', '184'))
```

### [移动 0](https://leetcode.cn/problems/move-zeroes/)

#### 将 0 移动到最后

```javascript
function moveZero(num) {
  let j = 0
  for (let i = 0; i < num.length; i++) {
    if (num[i] !== 0) {
      num[j] = num[i]
      j++
    }
  }
  while (j < arr.length) {
    num[j] = 0
    j++
  }
}
```

#### 将 0 移到最前

```javascript
function moveZero(num) {
  let j = num.length - 1
  for (let i = num.length - 1; i >= 0; i--) {
    if (num[i] !== 0) {
      num[j] = num[i]
      j--
    }
  }
  while (j >= 0) {
    num[j] = 0
    j--
  }
}
```

### 20.[有效括号](https://leetcode.cn/problems/valid-parentheses/)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

**答案：**

利用 `栈` 先进后出的原理。

```typescript
function isValid(str: string): boolean {
  const stack = []
  const map: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}',
  }
  for (let i of str) {
    if (map[i]) {
      stack.unshift(map[i])
    } else {
      if (stack[0] === i) {
        stack.shift()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}
```
