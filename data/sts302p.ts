type Question = {
    question: string;
    options: string[];
    answer: string;
  };
  
  export const questionsByTopic: { [topic: string]: Question[] } = {
    "Merge Sort for Doubly Linked List": [
      {
        question: "What is the base condition for merge sort in a doubly linked list?",
        options: ["When head is null or head.next is null", "When list size is even", "When head.prev is null", "When tail.next is null"],
        answer: "When head is null or head.next is null",
      },
      {
        question: "What is the purpose of the split function in merge sort on DLL?",
        options: ["To reverse the list", "To split the list into two halves", "To delete the middle node", "To find and move the max node"],
        answer: "To split the list into two halves",
      },
      {
        question: "What is the time complexity of merge sort on a doubly linked list?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        answer: "O(n log n)",
      },
      {
        question: "Which traversal direction(s) can be used in a doubly linked list?",
        options: ["Only forward", "Only backward", "Both forward and backward", "None"],
        answer: "Both forward and backward",
      },
      {
        question: "What is the key operation during the merge step of merge sort for DLL?",
        options: ["In-place reversal", "Merge two sorted lists", "Delete duplicates", "Apply stack-based recursion"],
        answer: "Merge two sorted lists",
      },
    ],
    
    "Minimum Stack": [
      {
        question: "What does a Minimum Stack track in addition to values?",
        options: ["Stack size", "Current minimum value", "Average of all values", "Maximum value"],
        answer: "Current minimum value",
      },
      {
        question: "Which additional data structure is often used in implementing a minimum stack?",
        options: ["Queue", "Set", "Auxiliary stack", "Tree"],
        answer: "Auxiliary stack",
      },
      {
        question: "What is the time complexity for retrieving the minimum element in a minimum stack?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        answer: "O(1)",
      },
      {
        question: "What happens during a push operation in a minimum stack?",
        options: ["Only push onto one stack", "Push only if smaller", "Push into both main and auxiliary stacks", "Always push null values"],
        answer: "Push into both main and auxiliary stacks",
      },
      {
        question: "How does a pop operation affect the minimum stack?",
        options: ["Pops only from main stack", "Pops only from auxiliary stack", "Pops from both stacks", "Pops from queue"],
        answer: "Pops from both stacks",
      },
    ],
    
    "Celebrity Problem": [
      {
        question: "In the celebrity problem, how many people must a celebrity know?",
        options: ["All", "One", "None", "Half"],
        answer: "None",
      },
      {
        question: "Who must know the celebrity?",
        options: ["Nobody", "Only friends", "Everyone else", "Only people who are not celebrities"],
        answer: "Everyone else",
      },
      {
        question: "What is the optimal time complexity of solving the celebrity problem?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        answer: "O(n)",
      },
      {
        question: "Which data structure is commonly used in the brute-force solution of the celebrity problem?",
        options: ["Queue", "Matrix", "Tree", "Graph"],
        answer: "Matrix",
      },
      {
        question: "Which condition identifies person A as not a celebrity when checking against B?",
        options: ["A knows B", "B knows A", "A doesn't know B", "A is equal to B"],
        answer: "A knows B",
      },
    ],
    
    "Iterative Tower of Hanoi": [
      {
        question: "How many total moves are required to solve Tower of Hanoi with n disks?",
        options: ["n", "2^n", "2^n - 1", "n²"],
        answer: "2^n - 1",
      },
      {
        question: "In the iterative version, what determines whether a move is between source and destination?",
        options: ["Disk size", "Iteration number", "Whether n is even or odd", "Current stack size"],
        answer: "Whether n is even or odd",
      },
      {
        question: "What is the data structure used to simulate Tower of Hanoi iteratively?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        answer: "Stack",
      },
      {
        question: "What is the first move in iterative Tower of Hanoi when n is even?",
        options: ["Source → Destination", "Source → Auxiliary", "Destination → Auxiliary", "Auxiliary → Source"],
        answer: "Source → Auxiliary",
      },
      {
        question: "What happens if the move is not legal in iterative Tower of Hanoi?",
        options: ["Skip", "Move smaller disk only", "Move larger disk", "Terminate"],
        answer: "Move smaller disk only",
      },
    ],
    
    "Stock Span Problem": [
      {
        question: "What does the stock span value indicate?",
        options: ["Highest price", "How many consecutive days price was higher", "Days until next price drop", "Number of days the price was less than or equal"],
        answer: "Number of days the price was less than or equal",
      },
      {
        question: "What data structure is used for efficient stock span calculation?",
        options: ["Queue", "Stack", "Heap", "Set"],
        answer: "Stack",
      },
      {
        question: "What is the worst-case time complexity for calculating spans for n days?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        answer: "O(n)",
      },
      {
        question: "What is pushed onto the stack during the stock span algorithm?",
        options: ["Prices only", "Spans", "Indices", "Both prices and indices"],
        answer: "Indices",
      },
      {
        question: "When is the stack popped during the stock span calculation?",
        options: ["When the current price is lower than the top", "When the current price is higher than the top", "When stack is full", "Never"],
        answer: "When the current price is higher than the top",
      },
    ],
    
    "Priority Queue using Doubly Linked List": [
      {
        question: "What is stored in each node of a priority queue using DLL?",
        options: ["Value only", "Priority only", "Value and priority", "Index"],
        answer: "Value and priority",
      },
      {
        question: "What operation determines the ordering of elements in a DLL-based priority queue?",
        options: ["Arrival time", "Priority comparison", "Random sorting", "Stack order"],
        answer: "Priority comparison",
      },
      {
        question: "Where is the highest priority node placed in a max-priority queue?",
        options: ["At the end", "At the front", "Randomly", "Middle"],
        answer: "At the front",
      },
      {
        question: "Which method is efficient for inserting into a sorted DLL priority queue?",
        options: ["Insert at head", "Linear search for position", "Insert at tail", "Binary search"],
        answer: "Linear search for position",
      },
      {
        question: "What is the time complexity for insertion in a sorted DLL priority queue?",
        options: ["O(log n)", "O(n)", "O(1)", "O(n²)"],
        answer: "O(n)",
      },
    ],
    
    "Sort Without Extra Space": [
      {
        question: "Which technique allows sorting an array in-place without extra space?",
        options: ["Quick Sort", "Merge Sort", "Counting Sort", "Radix Sort"],
        answer: "Quick Sort",
      },
      {
        question: "What is the space complexity of in-place sorting?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: "O(1)",
      },
      {
        question: "Which sorting algorithm is not in-place?",
        options: ["Selection Sort", "Heap Sort", "Merge Sort", "Insertion Sort"],
        answer: "Merge Sort",
      },
      {
        question: "What does \"in-place\" mean in sorting context?",
        options: ["No comparisons", "Uses O(1) extra space", "Requires recursion", "Uses stack"],
        answer: "Uses O(1) extra space",
      },
      {
        question: "Can quicksort be modified to use in-place sorting?",
        options: ["No", "Yes", "Only for integers", "Only if array is sorted"],
        answer: "Yes",
      },
    ],
    
    "Max Sliding Window": [
      {
        question: "What is the goal of the sliding window maximum problem?",
        options: ["Find min element", "Find max in each window", "Count window elements", "Sum all elements"],
        answer: "Find max in each window",
      },
      {
        question: "Which data structure is optimal for solving sliding window maximum?",
        options: ["Stack", "Heap", "Queue/Deque", "Tree"],
        answer: "Queue/Deque",
      },
      {
        question: "What is the time complexity using deque for sliding window maximum?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(n³)"],
        answer: "O(n)",
      },
      {
        question: "When is an index removed from the front of the deque?",
        options: ["When it holds min", "When it's out of window", "When it is repeated", "When it's not the last"],
        answer: "When it's out of window",
      },
      {
        question: "What is stored in deque in sliding window algorithm?",
        options: ["Values", "Indices", "Windows", "Maximums only"],
        answer: "Indices",
      },
    ],
    
    "Stack Permutations, Recover BST": [
      {
        question: "Stack permutations are related to which type of traversal?",
        options: ["Preorder", "Inorder", "Stack simulation", "DFS only"],
        answer: "Stack simulation",
      },
      {
        question: "Which condition must be met for a sequence to be a valid stack permutation?",
        options: ["Elements in reverse", "Order of popping matches permutation", "No repeats", "Even number of elements"],
        answer: "Order of popping matches permutation",
      },
      {
        question: "In recovering BST, what data is required?",
        options: ["Parent pointers", "Inorder traversal", "Postorder traversal", "Level order traversal"],
        answer: "Inorder traversal",
      },
      {
        question: "How many nodes are swapped in a BST that needs recovery?",
        options: ["1", "2", "3", "All"],
        answer: "2",
      },
      {
        question: "What is the key step in recovering a BST with two swapped nodes?",
        options: ["Delete and reinsert", "Rebuild BST", "Identify and swap back", "Change root only"],
        answer: "Identify and swap back",
      },
    ],
    
    "Views of Tree (Top, Bottom, Left, Right)": [
      {
        question: "Which traversal is used in Top View of a binary tree?",
        options: ["DFS", "Inorder", "Level Order + Horizontal Distance", "Postorder"],
        answer: "Level Order + Horizontal Distance",
      },
      {
        question: "In Bottom View, which node is preferred at a horizontal distance?",
        options: ["Topmost", "Leftmost", "Rightmost", "Bottommost"],
        answer: "Bottommost",
      },
      {
        question: "What is the key value stored to distinguish positions in views?",
        options: ["Depth", "Height", "Horizontal Distance", "Parent Value"],
        answer: "Horizontal Distance",
      },
      {
        question: "Right View of a tree can be extracted using which traversal method?",
        options: ["BFS right to left", "DFS right first", "DFS left first", "Postorder"],
        answer: "DFS right first",
      },
      {
        question: "What is required for Left View of a tree?",
        options: ["Preorder", "Maximum level tracking", "Inorder", "Postorder"],
        answer: "Maximum level tracking",
      },
    ],
    
    "Vertical Order Traversal": [
      {
        question: "Vertical order traversal uses which two parameters?",
        options: ["Level and index", "Horizontal distance and level", "Height and depth", "Stack and queue"],
        answer: "Horizontal distance and level",
      },
      {
        question: "What data structure is used to group nodes by horizontal distance?",
        options: ["Stack", "TreeSet", "HashMap or TreeMap", "Queue"],
        answer: "HashMap or TreeMap",
      },
      {
        question: "What traversal ensures proper grouping in vertical order?",
        options: ["DFS", "BFS with coordinates", "Postorder", "Inorder"],
        answer: "BFS with coordinates",
      },
      {
        question: "What order is required when multiple nodes have the same (hd, level)?",
        options: ["Max first", "Left to right", "Top to bottom", "Any order"],
        answer: "Left to right",
      },
      {
        question: "In vertical traversal, nodes in same column are sorted by:",
        options: ["Node value only", "Node height only", "Level and then value", "Parent order"],
        answer: "Level and then value",
      },
    ],
    
    "Boundary Traversal of Binary Tree": [
      {
        question: "What are the three parts of boundary traversal?",
        options: ["Root, Right, Leaf", "Left boundary, Leaves, Right boundary", "Top, Bottom, Leaves", "Only Leaves"],
        answer: "Left boundary, Leaves, Right boundary",
      },
      {
        question: "In which order are the boundary nodes printed?",
        options: ["Left to right", "Top to bottom", "Clockwise", "Anti-clockwise"],
        answer: "Anti-clockwise",
      },
      {
        question: "Which nodes are excluded in left/right boundary traversal?",
        options: ["Nulls", "Root", "Leaf nodes", "All nodes"],
        answer: "Leaf nodes",
      },
      {
        question: "What traversal is used for collecting leaves?",
        options: ["Postorder", "Inorder", "Any DFS", "BFS only"],
        answer: "Inorder",
      },
      {
        question: "Can a node be repeated in boundary traversal?",
        options: ["No", "Yes, always", "Yes, only root", "Yes, leaves can repeat"],
        answer: "No",
      },
    ],
    
    "BFS and DFS": [
      {
        question: "Which data structure is used for BFS?",
        options: ["Stack", "Queue", "Deque", "Priority Queue"],
        answer: "Queue",
      },
      {
        question: "DFS can be implemented using:",
        options: ["Stack or Recursion", "Queue", "Set only", "TreeMap"],
        answer: "Stack or Recursion",
      },
      {
        question: "What is the time complexity of BFS/DFS in an adjacency list?",
        options: ["O(V)", "O(E)", "O(V+E)", "O(V×E)"],
        answer: "O(V+E)",
      },
      {
        question: "Which traversal guarantees shortest path in unweighted graph?",
        options: ["DFS", "Dijkstra", "BFS", "A*"],
        answer: "BFS",
      },
      {
        question: "DFS is best suited for:",
        options: ["Finding shortest path", "Finding connected components", "Level order printing", "Sorting by level"],
        answer: "Finding connected components",
      },
    ],
    
    "Dial's Algorithm": [
      {
        question: "Dial's Algorithm is used for graphs with:",
        options: ["Negative weights", "Only 0-1 weights", "Small non-negative integer weights", "Undirected graphs only"],
        answer: "Small non-negative integer weights",
      },
      {
        question: "Which data structure is central in Dial's Algorithm?",
        options: ["Priority queue", "Min Heap", "Bucket array", "Stack"],
        answer: "Bucket array",
      },
      {
        question: "Dial's algorithm is a variation of:",
        options: ["DFS", "Prim's", "Bellman-Ford", "Dijkstra's"],
        answer: "Dijkstra's",
      },
      {
        question: "Time complexity of Dial's algorithm is:",
        options: ["O(V+E)", "O(E log V)", "O(W × V) where W is max edge weight", "O(V²)"],
        answer: "O(W × V) where W is max edge weight",
      },
      {
        question: "Dial's algorithm is best used when:",
        options: ["Edge weights are floating point", "All edge weights are 1", "Edge weights are integers in small range", "Graph is unconnected"],
        answer: "Edge weights are integers in small range",
      },
    ],
    
    "Bellman-Ford Algorithm": [
      {
        question: "What kind of graphs does Bellman-Ford work on?",
        options: ["Undirected only", "Weighted with no cycles", "Weighted with negative edges", "Trees only"],
        answer: "Weighted with negative edges",
      },
      {
        question: "What is the time complexity of Bellman-Ford algorithm?",
        options: ["O(V+E)", "O(E log V)", "O(VE)", "O(V²)"],
        answer: "O(VE)",
      },
      {
        question: "How many times are edges relaxed in Bellman-Ford?",
        options: ["E", "V-1", "V", "E-1"],
        answer: "V-1",
      },
      {
        question: "What does Bellman-Ford detect that Dijkstra cannot?",
        options: ["Cycles", "Negative weight cycles", "Minimum spanning tree", "DFS path"],
        answer: "Negative weight cycles",
      },
      {
        question: "Which condition breaks Bellman-Ford early?",
        options: ["All edge weights same", "No changes in any edge relax", "Heap is empty", "All visited"],
        answer: "No changes in any edge relax",
      },
    ],
    
    "Topological Sort": [
      {
        question: "Which graph type supports topological sorting?",
        options: ["Undirected", "DAG", "Any weighted graph", "Tree"],
        answer: "DAG",
      },
      {
        question: "Which algorithm can be used for topological sort?",
        options: ["Dijkstra", "DFS", "Kruskal", "Prim"],
        answer: "DFS",
      },
      {
        question: "What happens if a cycle exists in a graph to be topologically sorted?",
        options: ["Sorts partially", "Skips cycle", "Not possible", "DFS fails"],
        answer: "Not possible",
      },
      {
        question: "In Kahn's algorithm, nodes with what indegree are added to queue first?",
        options: ["Maximum", "One", "Zero", "Two"],
        answer: "Zero",
      },
      {
        question: "How many topological orders are possible for a graph?",
        options: ["One", "Zero", "Depends on structure", "Infinite"],
        answer: "Depends on structure",
      },
    ]
  };