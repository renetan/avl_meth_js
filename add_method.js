(function(global) {

	var AVLTree = function (_comparison, _equality) {
        this.root = null;
        this.count = 0;
 
        this.comparison = _comparison ? _comparison : function (val1, val2) {
            return val1 - val2;
        };
        this.equality = _equality ? _equality : function (val1, val2) {
            return val1 === val2;
        };
    }

	var Node = function(val) {
        this.val = val;
        this.parent = null;
        this.balanceFactor = 0;  //dulj na vuzlite na leftChild - vuzlite na rightChild
     
        this.left = null;
        this.right = null;
     
        this.isRoot = function() {
            return (this.parent == null);
        }
     
        this.isLeaf = function() {
            return (this.left == null) && (this.right == null);
        };
     
        this.isLeftChild = function() {
            return this.parent.left == this;
        };

        this.isRightChild = function() {    		//moje i bez
        	return this.parent.right == this;
        };
    }
	
	AVLTree.prototype.clear = function() {
        this.root = null;
        this.count = 0; //-->br na vuzlite stava 0
    }

    AVLTree.prototype.min = function () {
        if (this.root == null) {
            return undefined;
        }
 
        var maxNode = this.root;
        while (maxNode.left != null) {
            maxNode = maxNode.left;
        }
 
        return maxNode.val;
    }

    AVLTree.prototype.max = function () {
        if (this.root == null) {
            return undefined;
        }
 
        var maxNode = this.root;
        while (maxNode.right != null) {
            maxNode = maxNode.right;
        }
 
        return maxNode.val;
    }

    AVLTree.prototype.add = function(val) {
        var newNode = new Node(val);
        this.count += 1;
     
        if (this.root == null) {
            this.root = newNode;
            return newNode;
        }
     
        var currentNode = this.root;
        while (true) {
            if (this.comparison(val, currentNode.val) < 0) {
                if (currentNode.left) {
                    currentNode = currentNode.left;
                } else {
                    currentNode.left = newNode;
                    break;
                }
            } else {
                if (currentNode.right) {
                    currentNode = currentNode.right;
                } else {
                    currentNode.right = newNode;
                    break;
                }   
            }
        }
        newNode.parent = currentNode;
     
        currentNode = newNode;
        while (currentNode.parent) {
            var parent = currentNode.parent,
                prevBalanceFactor = parent.balanceFactor;
         
            if (currentNode.isLeftChild()) {	//the longest chain of nodes under the leftCh - tlconu the rightCh
                parent.balanceFactor += 1;
            } else {
                parent.balanceFactor -= 1;
            }
         
            if (Math.abs(parent.balanceFactor) < Math.abs(prevBalanceFactor)) {
                break;
            }
         
            currentNode = parent;
        }
     
        return newNode;
    }

    AVLTree.prototype.search = function (val) {
        var currentNode = this.root;
        while (currentNode) {
            if (this.equality(val, currentNode.val)) {
                return currentNode;
            }
 
            if (this.comparison(val, currentNode.val) < 0) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return null;
    }
    
    global.AVLTree = AVLTree;

})(this);
