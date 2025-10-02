class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
    height;
    weight;
    moves = [];

    get mainType() {
        return this.types.length > 0 ? this.types[0] : undefined;
    }
}

module.exports = Pokemon;
