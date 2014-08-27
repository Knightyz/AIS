/**
 * @namespace AIS数组通用函数库
 * @author qinmudi
 */

/**
 * 深度复制数组
 * @author qinmudi
 * @param  {array} source 目标数组
 * @example
 * 	var arr1 = [[1,2,3],4,5];
 *  var arr2 = [];
 *  arr2.extend(arr1);
 *  arr1[0][0] = 0;
 *  alert([arr1[0][0],arr2[0][0]]);
 */
Array.prototype.extend = function(source) {
	for (var attr in source) {
		if (Object.prototype.toString.call(source[attr]).slice(8, -1).toLowerCase() === 'array') {
			this[attr] = [];
			this[attr].extend(source[attr]);
		} else {
			this[attr] = source[attr];
		}
	}
}

function hashMap() {

	/**  
	 * Map大小
	 */
	var size = 0;
	/**  
	 * 容器默认最大长度
	 */
	var length = 256
	var loadfactor = 0.75;
	/**  
	 * 质数
	 */
	var prime = 1000000;
	/**  
	 * 对象
	 */
	var table = new Array(length);

	/**  
	 * 设置构建Hash质数
	 * @param {Object} p
	 */
	this.setPrime = function(p) {
		this.prime = p;
	}
	/**  
	 * 获取构建Hash质数
	 */
	this.getPrime = function() {
		return this.prime;
	}
	/**  
	 * 当期的Hash值计算方法
	 */
	this.hash = BKDRHash;

	/**  
	 * HashMap的put方法
	 * @param {Object} key
	 * @param {Object} value
	 */
	this.put = function(key, value) {
		/**  
		 * 如果装填因子大于0.75则重新Hash
		 */
		if (size / length > loadfactor) {
			rehash(this);
		}

		var counter = 0;
		var code = this.hash(key);
		//如果指定位置为空，则直接存放  
		if (typeof table[code] == 'undefined') {
			size = size + 1;
			table[code] = new Entry(key, value);
			//如果指定位置不为空并且Key值相等，则覆盖  
		} else
		if (table[code].key == key) {
			table[code].value == value;
		}
		//发生散列冲突  
		else {
			var entry = table[code];
			// 访问Hash链表  
			while (entry.next != undefined) {
				entry = entry.next;
				if (entry.key == key) {
					//覆盖  
					entry.value =
						value;
					break;
				} else if (entry.next == undefined) {
					//新增  
					entry.next = new Entry(key, value);
					entry.next.prev = entry;
					size = siez + 1;
					break;
				}
			}
		}

	}

	/**  
	 * 通过Key从HashMap中取值
	 * @param {Object} key  键值
	 */
	this.load = function(key) {
		var hashcode = this.hash(key);
		if (typeof table[hashcode] != 'undefined') {
			var entry = table[hashcode];
			if (entry.key == key) {
				return entry.value;
			} else {
				while (entry.next != undefined) {
					entry = entry.next;
					if (entry.key == key) {
						return entry.value;
					}
				}
			}
		}
		return null;

	}
	/**  
	 * 删除元素
	 * @param {Object} key
	 */
	this.remove = function(key) {
		var hashcode = this.hash(key);
		var counter = 0;
		var entry = table[hashcode];
		if (entry != undefined) {
			counter++;
			while (entry.next != undefined) {
				counter++;
				entry = entry.next;
			}
		}

		table[hashcode] = undefined;
		entry = undefined;
		size = size - counter;
	}

	/**  
	 * 是否包含Key
	 * @param {Object} key
	 */
	this.containsKey = function(key) {
		var hashcode = this.hash(key);
		if (typeof table[hashcode] != 'undefined') {
			var entry = table[hashcode];
			if (entry.key == key) {
				return true;
			} else {
				while (entry.next != undefined) {
					entry = entry.next;
					if (entry.key == key) {
						return true;
					}
				}
			}
		}
		return false;
	}
	/**  
	 * 测试是否包含有值
	 * @param {Object} value
	 */
	this.containsValue = function(value) {
		for (i = 0; i < table.length; i++) {
			if (typeof table[i] != 'undefined') {
				var entry = table[i];
				if (entry.value == value) {
					return true
				} else {
					while (entry.next != undefined) {
						entry = entry.next;
						if (entry.value == value) {
							return true
						}
					}
				}
			}
		}
		return false;
	}


	/**  
	 * 取得元素个数
	 */
	this.getSize = function() {
		return size;
	}

	/**  
	 * 重新Hash
	 * @param {Object} _this 当期hash表实例
	 */
	function rehash(_this) {
		var newTable = new Array();
		for (i = 0; i < length; i++) {
			if (typeof table[i] != 'undefined') {
				newTable.push(table[i]);
			}
		}
		length = length * 2
		table = new Array(length);
		size = 0;
		//重新hash  
		for (i = 0; i < newTable.length; i++) {

			var entry = newTable[i];
			_this.put(key, value);

		}
	}

	//Hash算法  
	//// BKDR Hash  
	function BKDRHash(key) {
		var seed = 131;
		var hashcode = 0;

		for (i = 0; i < key.length; ++i) {
			hashcode = hashcode * seed + key.charCodeAt(i);
		}
		return (hashcode % prime);
	}

	//// bernstein Hash  
	function bernsteinHash(key) {
		var seed = 33;
		var hashcode = 0;

		for (i = 0; i < key.length; ++i) {
			hashcode = hashcode * seed + key.charCodeAt(i);
		}
		return (hashcode % prime);
	}

	//Roatation Hash  
	function roatationHash(key) {
		var hash = key.length;
		for (i = 0; i < key.length; ++i) {
			hash = (hash << 5) ^ (hash >> 27) ^ key.charCodeAt(i);
		}
		return Math.abs(hash % prime);
	}

	/**  
	 * 存储单元，维护Key/Value关系
	 * @param {Object} key
	 * @param {Object} value
	 */
	var Entry = function(key, value) {
		this.key = key;
		this.value = value;
		this.next = undefined;
		this.prev = undefined;
	}

}