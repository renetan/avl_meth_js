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
            
            if (parent.balanceFactor < -1 || parent.balanceFactor > 1) {
                this._rebalance(parent);
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
    
    AVLTree.prototype._rebalance = function (node) {
        if (node.balanceFactor < 0) {
            if (node.right.balanceFactor > 0) {
                this._rotateRight(node.right);
                this._rotateLeft(node);
            } else {
                this._rotateLeft(node);
            }
        } else if (node.balanceFactor > 0) {
            if (node.left.balanceFactor < 0) {
                this._rotateLeft(node.left);
                this._rotateRight(node);
            } else {
                this._rotateRight(node);
            }
        }
    }

    AVLTree.prototype._rotateLeft = function (rotRoot) {
        var newRoot = rotRoot.right;
        rotRoot.right = newRoot.left;
        if (newRoot.left != null) {
            newRoot.left.parent = rotRoot;
        }
        newRoot.parent = rotRoot.parent;
        if (rotRoot.parent == null) {
            this.root = newRoot;
        } else {
            if (rotRoot.isLeftChild()) {
                rotRoot.parent.left = newRoot;
            } else {
                rotRoot.parent.right = newRoot;
            }
        }
        newRoot.left = rotRoot;
        rotRoot.parent = newRoot;
        rotRoot.balanceFactor = rotRoot.balanceFactor + 1 - Math.min(newRoot.balanceFactor, 0);
        newRoot.balanceFactor = newRoot.balanceFactor + 1 + Math.max(rotRoot.balanceFactor, 0);
    }
 
    AVLTree.prototype._rotateRight = function (rotRoot) {
        var newRoot = rotRoot.left;
        rotRoot.left = newRoot.right;
        if (newRoot.right != null) {
            newRoot.right.parent = rotRoot;
        }
        newRoot.parent = rotRoot.parent;
        if (rotRoot.parent == null) {
            this.root = newRoot;
        } else {
            if (rotRoot.isLeftChild()) {
                rotRoot.parent.left = newRoot;
            } else {
                rotRoot.parent.right = newRoot;
            }
        }
        newRoot.right = rotRoot;
        rotRoot.parent = newRoot;
        rotRoot.balanceFactor = rotRoot.balanceFactor - 1 - Math.max(newRoot.balanceFactor, 0);
        newRoot.balanceFactor = newRoot.balanceFactor - 1 + Math.min(rotRoot.balanceFactor, 0);
    }
    
    global.AVLTree = AVLTree;

})(this);
