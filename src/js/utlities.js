// Perform union operation between
// called set and otherSet
Set.prototype.union = function(otherSet) {
	// creating new set to store union
	var unionSet = new Set();

	// iterate over the values and add
	// it to unionSet
	for (var elem of this) {
		unionSet.add(elem);
	}

	// iterate over the values and add it to
	// the unionSet
	for (var elem of otherSet) unionSet.add(elem);

	// return the values of unionSet
	return unionSet;
};

export { Set };
