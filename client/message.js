/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Position = $root.Position = (() => {

    /**
     * Properties of a Position.
     * @exports IPosition
     * @interface IPosition
     * @property {number|null} [x] Position x
     * @property {number|null} [y] Position y
     */

    /**
     * Constructs a new Position.
     * @exports Position
     * @classdesc Represents a Position.
     * @implements IPosition
     * @constructor
     * @param {IPosition=} [properties] Properties to set
     */
    function Position(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Position x.
     * @member {number} x
     * @memberof Position
     * @instance
     */
    Position.prototype.x = 0;

    /**
     * Position y.
     * @member {number} y
     * @memberof Position
     * @instance
     */
    Position.prototype.y = 0;

    /**
     * Creates a new Position instance using the specified properties.
     * @function create
     * @memberof Position
     * @static
     * @param {IPosition=} [properties] Properties to set
     * @returns {Position} Position instance
     */
    Position.create = function create(properties) {
        return new Position(properties);
    };

    /**
     * Encodes the specified Position message. Does not implicitly {@link Position.verify|verify} messages.
     * @function encode
     * @memberof Position
     * @static
     * @param {IPosition} message Position message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Position.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.x != null && Object.hasOwnProperty.call(message, "x"))
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
        if (message.y != null && Object.hasOwnProperty.call(message, "y"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
        return writer;
    };

    /**
     * Encodes the specified Position message, length delimited. Does not implicitly {@link Position.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Position
     * @static
     * @param {IPosition} message Position message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Position.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Position message from the specified reader or buffer.
     * @function decode
     * @memberof Position
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Position} Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Position.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Position();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.x = reader.float();
                    break;
                }
            case 2: {
                    message.y = reader.float();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Position message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Position
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Position} Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Position.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Position message.
     * @function verify
     * @memberof Position
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Position.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (typeof message.x !== "number")
                return "x: number expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (typeof message.y !== "number")
                return "y: number expected";
        return null;
    };

    /**
     * Creates a Position message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Position
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Position} Position
     */
    Position.fromObject = function fromObject(object) {
        if (object instanceof $root.Position)
            return object;
        let message = new $root.Position();
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        return message;
    };

    /**
     * Creates a plain object from a Position message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Position
     * @static
     * @param {Position} message Position
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Position.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        return object;
    };

    /**
     * Converts this Position to JSON.
     * @function toJSON
     * @memberof Position
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Position.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Position
     * @function getTypeUrl
     * @memberof Position
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Position.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Position";
    };

    return Position;
})();

export const Tiles = $root.Tiles = (() => {

    /**
     * Properties of a Tiles.
     * @exports ITiles
     * @interface ITiles
     * @property {number|null} [width] Tiles width
     * @property {number|null} [height] Tiles height
     */

    /**
     * Constructs a new Tiles.
     * @exports Tiles
     * @classdesc Represents a Tiles.
     * @implements ITiles
     * @constructor
     * @param {ITiles=} [properties] Properties to set
     */
    function Tiles(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Tiles width.
     * @member {number} width
     * @memberof Tiles
     * @instance
     */
    Tiles.prototype.width = 0;

    /**
     * Tiles height.
     * @member {number} height
     * @memberof Tiles
     * @instance
     */
    Tiles.prototype.height = 0;

    /**
     * Creates a new Tiles instance using the specified properties.
     * @function create
     * @memberof Tiles
     * @static
     * @param {ITiles=} [properties] Properties to set
     * @returns {Tiles} Tiles instance
     */
    Tiles.create = function create(properties) {
        return new Tiles(properties);
    };

    /**
     * Encodes the specified Tiles message. Does not implicitly {@link Tiles.verify|verify} messages.
     * @function encode
     * @memberof Tiles
     * @static
     * @param {ITiles} message Tiles message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tiles.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.width != null && Object.hasOwnProperty.call(message, "width"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.width);
        if (message.height != null && Object.hasOwnProperty.call(message, "height"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.height);
        return writer;
    };

    /**
     * Encodes the specified Tiles message, length delimited. Does not implicitly {@link Tiles.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Tiles
     * @static
     * @param {ITiles} message Tiles message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tiles.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Tiles message from the specified reader or buffer.
     * @function decode
     * @memberof Tiles
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Tiles} Tiles
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tiles.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Tiles();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.width = reader.int32();
                    break;
                }
            case 2: {
                    message.height = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Tiles message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Tiles
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Tiles} Tiles
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tiles.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Tiles message.
     * @function verify
     * @memberof Tiles
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Tiles.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.width != null && message.hasOwnProperty("width"))
            if (!$util.isInteger(message.width))
                return "width: integer expected";
        if (message.height != null && message.hasOwnProperty("height"))
            if (!$util.isInteger(message.height))
                return "height: integer expected";
        return null;
    };

    /**
     * Creates a Tiles message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Tiles
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Tiles} Tiles
     */
    Tiles.fromObject = function fromObject(object) {
        if (object instanceof $root.Tiles)
            return object;
        let message = new $root.Tiles();
        if (object.width != null)
            message.width = object.width | 0;
        if (object.height != null)
            message.height = object.height | 0;
        return message;
    };

    /**
     * Creates a plain object from a Tiles message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Tiles
     * @static
     * @param {Tiles} message Tiles
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Tiles.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.width = 0;
            object.height = 0;
        }
        if (message.width != null && message.hasOwnProperty("width"))
            object.width = message.width;
        if (message.height != null && message.hasOwnProperty("height"))
            object.height = message.height;
        return object;
    };

    /**
     * Converts this Tiles to JSON.
     * @function toJSON
     * @memberof Tiles
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Tiles.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Tiles
     * @function getTypeUrl
     * @memberof Tiles
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Tiles.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Tiles";
    };

    return Tiles;
})();

export const Map = $root.Map = (() => {

    /**
     * Properties of a Map.
     * @exports IMap
     * @interface IMap
     * @property {number|null} [tileSize] Map tileSize
     * @property {ITiles|null} [tiles] Map tiles
     * @property {number} time Map time
     * @property {number|null} [maxTime] Map maxTime
     * @property {number|null} [scale] Map scale
     */

    /**
     * Constructs a new Map.
     * @exports Map
     * @classdesc Represents a Map.
     * @implements IMap
     * @constructor
     * @param {IMap=} [properties] Properties to set
     */
    function Map(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Map tileSize.
     * @member {number} tileSize
     * @memberof Map
     * @instance
     */
    Map.prototype.tileSize = 0;

    /**
     * Map tiles.
     * @member {ITiles|null|undefined} tiles
     * @memberof Map
     * @instance
     */
    Map.prototype.tiles = null;

    /**
     * Map time.
     * @member {number} time
     * @memberof Map
     * @instance
     */
    Map.prototype.time = 0;

    /**
     * Map maxTime.
     * @member {number} maxTime
     * @memberof Map
     * @instance
     */
    Map.prototype.maxTime = 0;

    /**
     * Map scale.
     * @member {number} scale
     * @memberof Map
     * @instance
     */
    Map.prototype.scale = 0;

    /**
     * Creates a new Map instance using the specified properties.
     * @function create
     * @memberof Map
     * @static
     * @param {IMap=} [properties] Properties to set
     * @returns {Map} Map instance
     */
    Map.create = function create(properties) {
        return new Map(properties);
    };

    /**
     * Encodes the specified Map message. Does not implicitly {@link Map.verify|verify} messages.
     * @function encode
     * @memberof Map
     * @static
     * @param {IMap} message Map message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Map.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.tileSize != null && Object.hasOwnProperty.call(message, "tileSize"))
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.tileSize);
        if (message.tiles != null && Object.hasOwnProperty.call(message, "tiles"))
            $root.Tiles.encode(message.tiles, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.time);
        if (message.maxTime != null && Object.hasOwnProperty.call(message, "maxTime"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxTime);
        if (message.scale != null && Object.hasOwnProperty.call(message, "scale"))
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.scale);
        return writer;
    };

    /**
     * Encodes the specified Map message, length delimited. Does not implicitly {@link Map.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Map
     * @static
     * @param {IMap} message Map message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Map.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Map message from the specified reader or buffer.
     * @function decode
     * @memberof Map
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Map} Map
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Map.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Map();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.tileSize = reader.float();
                    break;
                }
            case 2: {
                    message.tiles = $root.Tiles.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.time = reader.int32();
                    break;
                }
            case 4: {
                    message.maxTime = reader.int32();
                    break;
                }
            case 5: {
                    message.scale = reader.float();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("time"))
            throw $util.ProtocolError("missing required 'time'", { instance: message });
        return message;
    };

    /**
     * Decodes a Map message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Map
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Map} Map
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Map.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Map message.
     * @function verify
     * @memberof Map
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Map.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.tileSize != null && message.hasOwnProperty("tileSize"))
            if (typeof message.tileSize !== "number")
                return "tileSize: number expected";
        if (message.tiles != null && message.hasOwnProperty("tiles")) {
            let error = $root.Tiles.verify(message.tiles);
            if (error)
                return "tiles." + error;
        }
        if (!$util.isInteger(message.time))
            return "time: integer expected";
        if (message.maxTime != null && message.hasOwnProperty("maxTime"))
            if (!$util.isInteger(message.maxTime))
                return "maxTime: integer expected";
        if (message.scale != null && message.hasOwnProperty("scale"))
            if (typeof message.scale !== "number")
                return "scale: number expected";
        return null;
    };

    /**
     * Creates a Map message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Map
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Map} Map
     */
    Map.fromObject = function fromObject(object) {
        if (object instanceof $root.Map)
            return object;
        let message = new $root.Map();
        if (object.tileSize != null)
            message.tileSize = Number(object.tileSize);
        if (object.tiles != null) {
            if (typeof object.tiles !== "object")
                throw TypeError(".Map.tiles: object expected");
            message.tiles = $root.Tiles.fromObject(object.tiles);
        }
        if (object.time != null)
            message.time = object.time | 0;
        if (object.maxTime != null)
            message.maxTime = object.maxTime | 0;
        if (object.scale != null)
            message.scale = Number(object.scale);
        return message;
    };

    /**
     * Creates a plain object from a Map message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Map
     * @static
     * @param {Map} message Map
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Map.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.tileSize = 0;
            object.tiles = null;
            object.time = 0;
            object.maxTime = 0;
            object.scale = 0;
        }
        if (message.tileSize != null && message.hasOwnProperty("tileSize"))
            object.tileSize = options.json && !isFinite(message.tileSize) ? String(message.tileSize) : message.tileSize;
        if (message.tiles != null && message.hasOwnProperty("tiles"))
            object.tiles = $root.Tiles.toObject(message.tiles, options);
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = message.time;
        if (message.maxTime != null && message.hasOwnProperty("maxTime"))
            object.maxTime = message.maxTime;
        if (message.scale != null && message.hasOwnProperty("scale"))
            object.scale = options.json && !isFinite(message.scale) ? String(message.scale) : message.scale;
        return object;
    };

    /**
     * Converts this Map to JSON.
     * @function toJSON
     * @memberof Map
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Map.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Map
     * @function getTypeUrl
     * @memberof Map
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Map.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Map";
    };

    return Map;
})();

export const Inventory = $root.Inventory = (() => {

    /**
     * Properties of an Inventory.
     * @exports IInventory
     * @interface IInventory
     * @property {number|null} [gold] Inventory gold
     * @property {number|null} [stone] Inventory stone
     * @property {number|null} [wood] Inventory wood
     */

    /**
     * Constructs a new Inventory.
     * @exports Inventory
     * @classdesc Represents an Inventory.
     * @implements IInventory
     * @constructor
     * @param {IInventory=} [properties] Properties to set
     */
    function Inventory(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Inventory gold.
     * @member {number} gold
     * @memberof Inventory
     * @instance
     */
    Inventory.prototype.gold = 0;

    /**
     * Inventory stone.
     * @member {number} stone
     * @memberof Inventory
     * @instance
     */
    Inventory.prototype.stone = 0;

    /**
     * Inventory wood.
     * @member {number} wood
     * @memberof Inventory
     * @instance
     */
    Inventory.prototype.wood = 0;

    /**
     * Creates a new Inventory instance using the specified properties.
     * @function create
     * @memberof Inventory
     * @static
     * @param {IInventory=} [properties] Properties to set
     * @returns {Inventory} Inventory instance
     */
    Inventory.create = function create(properties) {
        return new Inventory(properties);
    };

    /**
     * Encodes the specified Inventory message. Does not implicitly {@link Inventory.verify|verify} messages.
     * @function encode
     * @memberof Inventory
     * @static
     * @param {IInventory} message Inventory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Inventory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gold);
        if (message.stone != null && Object.hasOwnProperty.call(message, "stone"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.stone);
        if (message.wood != null && Object.hasOwnProperty.call(message, "wood"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.wood);
        return writer;
    };

    /**
     * Encodes the specified Inventory message, length delimited. Does not implicitly {@link Inventory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Inventory
     * @static
     * @param {IInventory} message Inventory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Inventory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Inventory message from the specified reader or buffer.
     * @function decode
     * @memberof Inventory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Inventory} Inventory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Inventory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Inventory();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.gold = reader.int32();
                    break;
                }
            case 2: {
                    message.stone = reader.int32();
                    break;
                }
            case 3: {
                    message.wood = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Inventory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Inventory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Inventory} Inventory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Inventory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Inventory message.
     * @function verify
     * @memberof Inventory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Inventory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.gold != null && message.hasOwnProperty("gold"))
            if (!$util.isInteger(message.gold))
                return "gold: integer expected";
        if (message.stone != null && message.hasOwnProperty("stone"))
            if (!$util.isInteger(message.stone))
                return "stone: integer expected";
        if (message.wood != null && message.hasOwnProperty("wood"))
            if (!$util.isInteger(message.wood))
                return "wood: integer expected";
        return null;
    };

    /**
     * Creates an Inventory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Inventory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Inventory} Inventory
     */
    Inventory.fromObject = function fromObject(object) {
        if (object instanceof $root.Inventory)
            return object;
        let message = new $root.Inventory();
        if (object.gold != null)
            message.gold = object.gold | 0;
        if (object.stone != null)
            message.stone = object.stone | 0;
        if (object.wood != null)
            message.wood = object.wood | 0;
        return message;
    };

    /**
     * Creates a plain object from an Inventory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Inventory
     * @static
     * @param {Inventory} message Inventory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Inventory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.gold = 0;
            object.stone = 0;
            object.wood = 0;
        }
        if (message.gold != null && message.hasOwnProperty("gold"))
            object.gold = message.gold;
        if (message.stone != null && message.hasOwnProperty("stone"))
            object.stone = message.stone;
        if (message.wood != null && message.hasOwnProperty("wood"))
            object.wood = message.wood;
        return object;
    };

    /**
     * Converts this Inventory to JSON.
     * @function toJSON
     * @memberof Inventory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Inventory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Inventory
     * @function getTypeUrl
     * @memberof Inventory
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Inventory.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Inventory";
    };

    return Inventory;
})();

export const Weapon = $root.Weapon = (() => {

    /**
     * Properties of a Weapon.
     * @exports IWeapon
     * @interface IWeapon
     * @property {number} id Weapon id
     * @property {number} damage Weapon damage
     * @property {number} mine Weapon mine
     * @property {number} level Weapon level
     * @property {string} code Weapon code
     * @property {number} upgradeCost Weapon upgradeCost
     * @property {number} maxLevel Weapon maxLevel
     */

    /**
     * Constructs a new Weapon.
     * @exports Weapon
     * @classdesc Represents a Weapon.
     * @implements IWeapon
     * @constructor
     * @param {IWeapon=} [properties] Properties to set
     */
    function Weapon(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Weapon id.
     * @member {number} id
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.id = 0;

    /**
     * Weapon damage.
     * @member {number} damage
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.damage = 0;

    /**
     * Weapon mine.
     * @member {number} mine
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.mine = 0;

    /**
     * Weapon level.
     * @member {number} level
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.level = 0;

    /**
     * Weapon code.
     * @member {string} code
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.code = "";

    /**
     * Weapon upgradeCost.
     * @member {number} upgradeCost
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.upgradeCost = 0;

    /**
     * Weapon maxLevel.
     * @member {number} maxLevel
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.maxLevel = 0;

    /**
     * Creates a new Weapon instance using the specified properties.
     * @function create
     * @memberof Weapon
     * @static
     * @param {IWeapon=} [properties] Properties to set
     * @returns {Weapon} Weapon instance
     */
    Weapon.create = function create(properties) {
        return new Weapon(properties);
    };

    /**
     * Encodes the specified Weapon message. Does not implicitly {@link Weapon.verify|verify} messages.
     * @function encode
     * @memberof Weapon
     * @static
     * @param {IWeapon} message Weapon message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Weapon.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.damage);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mine);
        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.level);
        writer.uint32(/* id 5, wireType 2 =*/42).string(message.code);
        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.upgradeCost);
        writer.uint32(/* id 7, wireType 0 =*/56).int32(message.maxLevel);
        return writer;
    };

    /**
     * Encodes the specified Weapon message, length delimited. Does not implicitly {@link Weapon.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Weapon
     * @static
     * @param {IWeapon} message Weapon message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Weapon.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Weapon message from the specified reader or buffer.
     * @function decode
     * @memberof Weapon
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Weapon} Weapon
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Weapon.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Weapon();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.int32();
                    break;
                }
            case 2: {
                    message.damage = reader.int32();
                    break;
                }
            case 3: {
                    message.mine = reader.int32();
                    break;
                }
            case 4: {
                    message.level = reader.int32();
                    break;
                }
            case 5: {
                    message.code = reader.string();
                    break;
                }
            case 6: {
                    message.upgradeCost = reader.int32();
                    break;
                }
            case 7: {
                    message.maxLevel = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
        if (!message.hasOwnProperty("damage"))
            throw $util.ProtocolError("missing required 'damage'", { instance: message });
        if (!message.hasOwnProperty("mine"))
            throw $util.ProtocolError("missing required 'mine'", { instance: message });
        if (!message.hasOwnProperty("level"))
            throw $util.ProtocolError("missing required 'level'", { instance: message });
        if (!message.hasOwnProperty("code"))
            throw $util.ProtocolError("missing required 'code'", { instance: message });
        if (!message.hasOwnProperty("upgradeCost"))
            throw $util.ProtocolError("missing required 'upgradeCost'", { instance: message });
        if (!message.hasOwnProperty("maxLevel"))
            throw $util.ProtocolError("missing required 'maxLevel'", { instance: message });
        return message;
    };

    /**
     * Decodes a Weapon message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Weapon
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Weapon} Weapon
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Weapon.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Weapon message.
     * @function verify
     * @memberof Weapon
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Weapon.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.id))
            return "id: integer expected";
        if (!$util.isInteger(message.damage))
            return "damage: integer expected";
        if (!$util.isInteger(message.mine))
            return "mine: integer expected";
        if (!$util.isInteger(message.level))
            return "level: integer expected";
        if (!$util.isString(message.code))
            return "code: string expected";
        if (!$util.isInteger(message.upgradeCost))
            return "upgradeCost: integer expected";
        if (!$util.isInteger(message.maxLevel))
            return "maxLevel: integer expected";
        return null;
    };

    /**
     * Creates a Weapon message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Weapon
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Weapon} Weapon
     */
    Weapon.fromObject = function fromObject(object) {
        if (object instanceof $root.Weapon)
            return object;
        let message = new $root.Weapon();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.damage != null)
            message.damage = object.damage | 0;
        if (object.mine != null)
            message.mine = object.mine | 0;
        if (object.level != null)
            message.level = object.level | 0;
        if (object.code != null)
            message.code = String(object.code);
        if (object.upgradeCost != null)
            message.upgradeCost = object.upgradeCost | 0;
        if (object.maxLevel != null)
            message.maxLevel = object.maxLevel | 0;
        return message;
    };

    /**
     * Creates a plain object from a Weapon message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Weapon
     * @static
     * @param {Weapon} message Weapon
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Weapon.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.damage = 0;
            object.mine = 0;
            object.level = 0;
            object.code = "";
            object.upgradeCost = 0;
            object.maxLevel = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.damage != null && message.hasOwnProperty("damage"))
            object.damage = message.damage;
        if (message.mine != null && message.hasOwnProperty("mine"))
            object.mine = message.mine;
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        if (message.upgradeCost != null && message.hasOwnProperty("upgradeCost"))
            object.upgradeCost = message.upgradeCost;
        if (message.maxLevel != null && message.hasOwnProperty("maxLevel"))
            object.maxLevel = message.maxLevel;
        return object;
    };

    /**
     * Converts this Weapon to JSON.
     * @function toJSON
     * @memberof Weapon
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Weapon.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Weapon
     * @function getTypeUrl
     * @memberof Weapon
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Weapon.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Weapon";
    };

    return Weapon;
})();

export const Timer = $root.Timer = (() => {

    /**
     * Properties of a Timer.
     * @exports ITimer
     * @interface ITimer
     * @property {number|null} [id] Timer id
     * @property {number|null} [waves] Timer waves
     * @property {number|null} [wavesPassed] Timer wavesPassed
     * @property {boolean|null} [inUse] Timer inUse
     * @property {number|null} [cd] Timer cd
     * @property {number|null} [gold] Timer gold
     */

    /**
     * Constructs a new Timer.
     * @exports Timer
     * @classdesc Represents a Timer.
     * @implements ITimer
     * @constructor
     * @param {ITimer=} [properties] Properties to set
     */
    function Timer(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Timer id.
     * @member {number} id
     * @memberof Timer
     * @instance
     */
    Timer.prototype.id = 0;

    /**
     * Timer waves.
     * @member {number} waves
     * @memberof Timer
     * @instance
     */
    Timer.prototype.waves = 0;

    /**
     * Timer wavesPassed.
     * @member {number} wavesPassed
     * @memberof Timer
     * @instance
     */
    Timer.prototype.wavesPassed = 0;

    /**
     * Timer inUse.
     * @member {boolean} inUse
     * @memberof Timer
     * @instance
     */
    Timer.prototype.inUse = false;

    /**
     * Timer cd.
     * @member {number} cd
     * @memberof Timer
     * @instance
     */
    Timer.prototype.cd = 0;

    /**
     * Timer gold.
     * @member {number} gold
     * @memberof Timer
     * @instance
     */
    Timer.prototype.gold = 0;

    /**
     * Creates a new Timer instance using the specified properties.
     * @function create
     * @memberof Timer
     * @static
     * @param {ITimer=} [properties] Properties to set
     * @returns {Timer} Timer instance
     */
    Timer.create = function create(properties) {
        return new Timer(properties);
    };

    /**
     * Encodes the specified Timer message. Does not implicitly {@link Timer.verify|verify} messages.
     * @function encode
     * @memberof Timer
     * @static
     * @param {ITimer} message Timer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Timer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.waves != null && Object.hasOwnProperty.call(message, "waves"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.waves);
        if (message.wavesPassed != null && Object.hasOwnProperty.call(message, "wavesPassed"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.wavesPassed);
        if (message.inUse != null && Object.hasOwnProperty.call(message, "inUse"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.inUse);
        if (message.cd != null && Object.hasOwnProperty.call(message, "cd"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.cd);
        if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.gold);
        return writer;
    };

    /**
     * Encodes the specified Timer message, length delimited. Does not implicitly {@link Timer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Timer
     * @static
     * @param {ITimer} message Timer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Timer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Timer message from the specified reader or buffer.
     * @function decode
     * @memberof Timer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Timer} Timer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Timer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Timer();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.int32();
                    break;
                }
            case 2: {
                    message.waves = reader.int32();
                    break;
                }
            case 3: {
                    message.wavesPassed = reader.int32();
                    break;
                }
            case 4: {
                    message.inUse = reader.bool();
                    break;
                }
            case 5: {
                    message.cd = reader.int32();
                    break;
                }
            case 6: {
                    message.gold = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Timer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Timer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Timer} Timer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Timer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Timer message.
     * @function verify
     * @memberof Timer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Timer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.waves != null && message.hasOwnProperty("waves"))
            if (!$util.isInteger(message.waves))
                return "waves: integer expected";
        if (message.wavesPassed != null && message.hasOwnProperty("wavesPassed"))
            if (!$util.isInteger(message.wavesPassed))
                return "wavesPassed: integer expected";
        if (message.inUse != null && message.hasOwnProperty("inUse"))
            if (typeof message.inUse !== "boolean")
                return "inUse: boolean expected";
        if (message.cd != null && message.hasOwnProperty("cd"))
            if (!$util.isInteger(message.cd))
                return "cd: integer expected";
        if (message.gold != null && message.hasOwnProperty("gold"))
            if (!$util.isInteger(message.gold))
                return "gold: integer expected";
        return null;
    };

    /**
     * Creates a Timer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Timer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Timer} Timer
     */
    Timer.fromObject = function fromObject(object) {
        if (object instanceof $root.Timer)
            return object;
        let message = new $root.Timer();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.waves != null)
            message.waves = object.waves | 0;
        if (object.wavesPassed != null)
            message.wavesPassed = object.wavesPassed | 0;
        if (object.inUse != null)
            message.inUse = Boolean(object.inUse);
        if (object.cd != null)
            message.cd = object.cd | 0;
        if (object.gold != null)
            message.gold = object.gold | 0;
        return message;
    };

    /**
     * Creates a plain object from a Timer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Timer
     * @static
     * @param {Timer} message Timer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Timer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.waves = 0;
            object.wavesPassed = 0;
            object.inUse = false;
            object.cd = 0;
            object.gold = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.waves != null && message.hasOwnProperty("waves"))
            object.waves = message.waves;
        if (message.wavesPassed != null && message.hasOwnProperty("wavesPassed"))
            object.wavesPassed = message.wavesPassed;
        if (message.inUse != null && message.hasOwnProperty("inUse"))
            object.inUse = message.inUse;
        if (message.cd != null && message.hasOwnProperty("cd"))
            object.cd = message.cd;
        if (message.gold != null && message.hasOwnProperty("gold"))
            object.gold = message.gold;
        return object;
    };

    /**
     * Converts this Timer to JSON.
     * @function toJSON
     * @memberof Timer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Timer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Timer
     * @function getTypeUrl
     * @memberof Timer
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Timer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Timer";
    };

    return Timer;
})();

export const Entity = $root.Entity = (() => {

    /**
     * Properties of an Entity.
     * @exports IEntity
     * @interface IEntity
     * @property {IPosition|null} [position] Entity position
     * @property {IPosition|null} [angle] Entity angle
     * @property {number} id Entity id
     * @property {number|null} [ownerId] Entity ownerId
     * @property {number|null} [level] Entity level
     * @property {string|null} [name] Entity name
     * @property {number|null} [wave] Entity wave
     * @property {number|null} [type] Entity type
     * @property {number|null} [bType] Entity bType
     * @property {number|null} [pType] Entity pType
     * @property {boolean|null} [self] Entity self
     * @property {boolean|null} [removed] Entity removed
     * @property {boolean|null} [isAttack] Entity isAttack
     * @property {number|null} [health] Entity health
     * @property {number|null} [maxHealth] Entity maxHealth
     * @property {number|null} [radius] Entity radius
     * @property {number|null} [weapon] Entity weapon
     * @property {IInventory|null} [inventory] Entity inventory
     * @property {number|null} [damageBy] Entity damageBy
     * @property {number|null} [style] Entity style
     * @property {Array.<IWeapon>|null} [weapons] Entity weapons
     * @property {Array.<ITimer>|null} [timers] Entity timers
     * @property {number|null} [track] Entity track
     * @property {number|null} [hat] Entity hat
     */

    /**
     * Constructs a new Entity.
     * @exports Entity
     * @classdesc Represents an Entity.
     * @implements IEntity
     * @constructor
     * @param {IEntity=} [properties] Properties to set
     */
    function Entity(properties) {
        this.weapons = [];
        this.timers = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Entity position.
     * @member {IPosition|null|undefined} position
     * @memberof Entity
     * @instance
     */
    Entity.prototype.position = null;

    /**
     * Entity angle.
     * @member {IPosition|null|undefined} angle
     * @memberof Entity
     * @instance
     */
    Entity.prototype.angle = null;

    /**
     * Entity id.
     * @member {number} id
     * @memberof Entity
     * @instance
     */
    Entity.prototype.id = 0;

    /**
     * Entity ownerId.
     * @member {number} ownerId
     * @memberof Entity
     * @instance
     */
    Entity.prototype.ownerId = 0;

    /**
     * Entity level.
     * @member {number} level
     * @memberof Entity
     * @instance
     */
    Entity.prototype.level = 0;

    /**
     * Entity name.
     * @member {string} name
     * @memberof Entity
     * @instance
     */
    Entity.prototype.name = "";

    /**
     * Entity wave.
     * @member {number} wave
     * @memberof Entity
     * @instance
     */
    Entity.prototype.wave = 0;

    /**
     * Entity type.
     * @member {number} type
     * @memberof Entity
     * @instance
     */
    Entity.prototype.type = 0;

    /**
     * Entity bType.
     * @member {number} bType
     * @memberof Entity
     * @instance
     */
    Entity.prototype.bType = 0;

    /**
     * Entity pType.
     * @member {number} pType
     * @memberof Entity
     * @instance
     */
    Entity.prototype.pType = 0;

    /**
     * Entity self.
     * @member {boolean} self
     * @memberof Entity
     * @instance
     */
    Entity.prototype.self = false;

    /**
     * Entity removed.
     * @member {boolean} removed
     * @memberof Entity
     * @instance
     */
    Entity.prototype.removed = false;

    /**
     * Entity isAttack.
     * @member {boolean} isAttack
     * @memberof Entity
     * @instance
     */
    Entity.prototype.isAttack = false;

    /**
     * Entity health.
     * @member {number} health
     * @memberof Entity
     * @instance
     */
    Entity.prototype.health = 0;

    /**
     * Entity maxHealth.
     * @member {number} maxHealth
     * @memberof Entity
     * @instance
     */
    Entity.prototype.maxHealth = 0;

    /**
     * Entity radius.
     * @member {number} radius
     * @memberof Entity
     * @instance
     */
    Entity.prototype.radius = 0;

    /**
     * Entity weapon.
     * @member {number} weapon
     * @memberof Entity
     * @instance
     */
    Entity.prototype.weapon = 0;

    /**
     * Entity inventory.
     * @member {IInventory|null|undefined} inventory
     * @memberof Entity
     * @instance
     */
    Entity.prototype.inventory = null;

    /**
     * Entity damageBy.
     * @member {number} damageBy
     * @memberof Entity
     * @instance
     */
    Entity.prototype.damageBy = 0;

    /**
     * Entity style.
     * @member {number} style
     * @memberof Entity
     * @instance
     */
    Entity.prototype.style = 0;

    /**
     * Entity weapons.
     * @member {Array.<IWeapon>} weapons
     * @memberof Entity
     * @instance
     */
    Entity.prototype.weapons = $util.emptyArray;

    /**
     * Entity timers.
     * @member {Array.<ITimer>} timers
     * @memberof Entity
     * @instance
     */
    Entity.prototype.timers = $util.emptyArray;

    /**
     * Entity track.
     * @member {number} track
     * @memberof Entity
     * @instance
     */
    Entity.prototype.track = 0;

    /**
     * Entity hat.
     * @member {number} hat
     * @memberof Entity
     * @instance
     */
    Entity.prototype.hat = 0;

    /**
     * Creates a new Entity instance using the specified properties.
     * @function create
     * @memberof Entity
     * @static
     * @param {IEntity=} [properties] Properties to set
     * @returns {Entity} Entity instance
     */
    Entity.create = function create(properties) {
        return new Entity(properties);
    };

    /**
     * Encodes the specified Entity message. Does not implicitly {@link Entity.verify|verify} messages.
     * @function encode
     * @memberof Entity
     * @static
     * @param {IEntity} message Entity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Entity.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.position != null && Object.hasOwnProperty.call(message, "position"))
            $root.Position.encode(message.position, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        if (message.wave != null && Object.hasOwnProperty.call(message, "wave"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.wave);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.type);
        if (message.self != null && Object.hasOwnProperty.call(message, "self"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.self);
        if (message.angle != null && Object.hasOwnProperty.call(message, "angle"))
            $root.Position.encode(message.angle, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.bType != null && Object.hasOwnProperty.call(message, "bType"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.bType);
        if (message.removed != null && Object.hasOwnProperty.call(message, "removed"))
            writer.uint32(/* id 9, wireType 0 =*/72).bool(message.removed);
        if (message.ownerId != null && Object.hasOwnProperty.call(message, "ownerId"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.ownerId);
        if (message.level != null && Object.hasOwnProperty.call(message, "level"))
            writer.uint32(/* id 11, wireType 0 =*/88).int32(message.level);
        if (message.health != null && Object.hasOwnProperty.call(message, "health"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.health);
        if (message.maxHealth != null && Object.hasOwnProperty.call(message, "maxHealth"))
            writer.uint32(/* id 13, wireType 0 =*/104).int32(message.maxHealth);
        if (message.pType != null && Object.hasOwnProperty.call(message, "pType"))
            writer.uint32(/* id 14, wireType 0 =*/112).int32(message.pType);
        if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
            writer.uint32(/* id 15, wireType 5 =*/125).float(message.radius);
        if (message.isAttack != null && Object.hasOwnProperty.call(message, "isAttack"))
            writer.uint32(/* id 16, wireType 0 =*/128).bool(message.isAttack);
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            writer.uint32(/* id 17, wireType 0 =*/136).int32(message.weapon);
        if (message.inventory != null && Object.hasOwnProperty.call(message, "inventory"))
            $root.Inventory.encode(message.inventory, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
        if (message.damageBy != null && Object.hasOwnProperty.call(message, "damageBy"))
            writer.uint32(/* id 19, wireType 0 =*/152).int32(message.damageBy);
        if (message.style != null && Object.hasOwnProperty.call(message, "style"))
            writer.uint32(/* id 20, wireType 0 =*/160).int32(message.style);
        if (message.weapons != null && message.weapons.length)
            for (let i = 0; i < message.weapons.length; ++i)
                $root.Weapon.encode(message.weapons[i], writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
        if (message.timers != null && message.timers.length)
            for (let i = 0; i < message.timers.length; ++i)
                $root.Timer.encode(message.timers[i], writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
        if (message.track != null && Object.hasOwnProperty.call(message, "track"))
            writer.uint32(/* id 23, wireType 0 =*/184).int32(message.track);
        if (message.hat != null && Object.hasOwnProperty.call(message, "hat"))
            writer.uint32(/* id 24, wireType 0 =*/192).int32(message.hat);
        return writer;
    };

    /**
     * Encodes the specified Entity message, length delimited. Does not implicitly {@link Entity.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Entity
     * @static
     * @param {IEntity} message Entity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Entity.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Entity message from the specified reader or buffer.
     * @function decode
     * @memberof Entity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Entity} Entity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Entity.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Entity();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.position = $root.Position.decode(reader, reader.uint32());
                    break;
                }
            case 7: {
                    message.angle = $root.Position.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.id = reader.int32();
                    break;
                }
            case 10: {
                    message.ownerId = reader.int32();
                    break;
                }
            case 11: {
                    message.level = reader.int32();
                    break;
                }
            case 3: {
                    message.name = reader.string();
                    break;
                }
            case 4: {
                    message.wave = reader.int32();
                    break;
                }
            case 5: {
                    message.type = reader.int32();
                    break;
                }
            case 8: {
                    message.bType = reader.int32();
                    break;
                }
            case 14: {
                    message.pType = reader.int32();
                    break;
                }
            case 6: {
                    message.self = reader.bool();
                    break;
                }
            case 9: {
                    message.removed = reader.bool();
                    break;
                }
            case 16: {
                    message.isAttack = reader.bool();
                    break;
                }
            case 12: {
                    message.health = reader.int32();
                    break;
                }
            case 13: {
                    message.maxHealth = reader.int32();
                    break;
                }
            case 15: {
                    message.radius = reader.float();
                    break;
                }
            case 17: {
                    message.weapon = reader.int32();
                    break;
                }
            case 18: {
                    message.inventory = $root.Inventory.decode(reader, reader.uint32());
                    break;
                }
            case 19: {
                    message.damageBy = reader.int32();
                    break;
                }
            case 20: {
                    message.style = reader.int32();
                    break;
                }
            case 21: {
                    if (!(message.weapons && message.weapons.length))
                        message.weapons = [];
                    message.weapons.push($root.Weapon.decode(reader, reader.uint32()));
                    break;
                }
            case 22: {
                    if (!(message.timers && message.timers.length))
                        message.timers = [];
                    message.timers.push($root.Timer.decode(reader, reader.uint32()));
                    break;
                }
            case 23: {
                    message.track = reader.int32();
                    break;
                }
            case 24: {
                    message.hat = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
        return message;
    };

    /**
     * Decodes an Entity message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Entity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Entity} Entity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Entity.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Entity message.
     * @function verify
     * @memberof Entity
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Entity.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.position != null && message.hasOwnProperty("position")) {
            let error = $root.Position.verify(message.position);
            if (error)
                return "position." + error;
        }
        if (message.angle != null && message.hasOwnProperty("angle")) {
            let error = $root.Position.verify(message.angle);
            if (error)
                return "angle." + error;
        }
        if (!$util.isInteger(message.id))
            return "id: integer expected";
        if (message.ownerId != null && message.hasOwnProperty("ownerId"))
            if (!$util.isInteger(message.ownerId))
                return "ownerId: integer expected";
        if (message.level != null && message.hasOwnProperty("level"))
            if (!$util.isInteger(message.level))
                return "level: integer expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.wave != null && message.hasOwnProperty("wave"))
            if (!$util.isInteger(message.wave))
                return "wave: integer expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.bType != null && message.hasOwnProperty("bType"))
            if (!$util.isInteger(message.bType))
                return "bType: integer expected";
        if (message.pType != null && message.hasOwnProperty("pType"))
            if (!$util.isInteger(message.pType))
                return "pType: integer expected";
        if (message.self != null && message.hasOwnProperty("self"))
            if (typeof message.self !== "boolean")
                return "self: boolean expected";
        if (message.removed != null && message.hasOwnProperty("removed"))
            if (typeof message.removed !== "boolean")
                return "removed: boolean expected";
        if (message.isAttack != null && message.hasOwnProperty("isAttack"))
            if (typeof message.isAttack !== "boolean")
                return "isAttack: boolean expected";
        if (message.health != null && message.hasOwnProperty("health"))
            if (!$util.isInteger(message.health))
                return "health: integer expected";
        if (message.maxHealth != null && message.hasOwnProperty("maxHealth"))
            if (!$util.isInteger(message.maxHealth))
                return "maxHealth: integer expected";
        if (message.radius != null && message.hasOwnProperty("radius"))
            if (typeof message.radius !== "number")
                return "radius: number expected";
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            if (!$util.isInteger(message.weapon))
                return "weapon: integer expected";
        if (message.inventory != null && message.hasOwnProperty("inventory")) {
            let error = $root.Inventory.verify(message.inventory);
            if (error)
                return "inventory." + error;
        }
        if (message.damageBy != null && message.hasOwnProperty("damageBy"))
            if (!$util.isInteger(message.damageBy))
                return "damageBy: integer expected";
        if (message.style != null && message.hasOwnProperty("style"))
            if (!$util.isInteger(message.style))
                return "style: integer expected";
        if (message.weapons != null && message.hasOwnProperty("weapons")) {
            if (!Array.isArray(message.weapons))
                return "weapons: array expected";
            for (let i = 0; i < message.weapons.length; ++i) {
                let error = $root.Weapon.verify(message.weapons[i]);
                if (error)
                    return "weapons." + error;
            }
        }
        if (message.timers != null && message.hasOwnProperty("timers")) {
            if (!Array.isArray(message.timers))
                return "timers: array expected";
            for (let i = 0; i < message.timers.length; ++i) {
                let error = $root.Timer.verify(message.timers[i]);
                if (error)
                    return "timers." + error;
            }
        }
        if (message.track != null && message.hasOwnProperty("track"))
            if (!$util.isInteger(message.track))
                return "track: integer expected";
        if (message.hat != null && message.hasOwnProperty("hat"))
            if (!$util.isInteger(message.hat))
                return "hat: integer expected";
        return null;
    };

    /**
     * Creates an Entity message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Entity
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Entity} Entity
     */
    Entity.fromObject = function fromObject(object) {
        if (object instanceof $root.Entity)
            return object;
        let message = new $root.Entity();
        if (object.position != null) {
            if (typeof object.position !== "object")
                throw TypeError(".Entity.position: object expected");
            message.position = $root.Position.fromObject(object.position);
        }
        if (object.angle != null) {
            if (typeof object.angle !== "object")
                throw TypeError(".Entity.angle: object expected");
            message.angle = $root.Position.fromObject(object.angle);
        }
        if (object.id != null)
            message.id = object.id | 0;
        if (object.ownerId != null)
            message.ownerId = object.ownerId | 0;
        if (object.level != null)
            message.level = object.level | 0;
        if (object.name != null)
            message.name = String(object.name);
        if (object.wave != null)
            message.wave = object.wave | 0;
        if (object.type != null)
            message.type = object.type | 0;
        if (object.bType != null)
            message.bType = object.bType | 0;
        if (object.pType != null)
            message.pType = object.pType | 0;
        if (object.self != null)
            message.self = Boolean(object.self);
        if (object.removed != null)
            message.removed = Boolean(object.removed);
        if (object.isAttack != null)
            message.isAttack = Boolean(object.isAttack);
        if (object.health != null)
            message.health = object.health | 0;
        if (object.maxHealth != null)
            message.maxHealth = object.maxHealth | 0;
        if (object.radius != null)
            message.radius = Number(object.radius);
        if (object.weapon != null)
            message.weapon = object.weapon | 0;
        if (object.inventory != null) {
            if (typeof object.inventory !== "object")
                throw TypeError(".Entity.inventory: object expected");
            message.inventory = $root.Inventory.fromObject(object.inventory);
        }
        if (object.damageBy != null)
            message.damageBy = object.damageBy | 0;
        if (object.style != null)
            message.style = object.style | 0;
        if (object.weapons) {
            if (!Array.isArray(object.weapons))
                throw TypeError(".Entity.weapons: array expected");
            message.weapons = [];
            for (let i = 0; i < object.weapons.length; ++i) {
                if (typeof object.weapons[i] !== "object")
                    throw TypeError(".Entity.weapons: object expected");
                message.weapons[i] = $root.Weapon.fromObject(object.weapons[i]);
            }
        }
        if (object.timers) {
            if (!Array.isArray(object.timers))
                throw TypeError(".Entity.timers: array expected");
            message.timers = [];
            for (let i = 0; i < object.timers.length; ++i) {
                if (typeof object.timers[i] !== "object")
                    throw TypeError(".Entity.timers: object expected");
                message.timers[i] = $root.Timer.fromObject(object.timers[i]);
            }
        }
        if (object.track != null)
            message.track = object.track | 0;
        if (object.hat != null)
            message.hat = object.hat | 0;
        return message;
    };

    /**
     * Creates a plain object from an Entity message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Entity
     * @static
     * @param {Entity} message Entity
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Entity.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.weapons = [];
            object.timers = [];
        }
        if (options.defaults) {
            object.position = null;
            object.id = 0;
            object.name = "";
            object.wave = 0;
            object.type = 0;
            object.self = false;
            object.angle = null;
            object.bType = 0;
            object.removed = false;
            object.ownerId = 0;
            object.level = 0;
            object.health = 0;
            object.maxHealth = 0;
            object.pType = 0;
            object.radius = 0;
            object.isAttack = false;
            object.weapon = 0;
            object.inventory = null;
            object.damageBy = 0;
            object.style = 0;
            object.track = 0;
            object.hat = 0;
        }
        if (message.position != null && message.hasOwnProperty("position"))
            object.position = $root.Position.toObject(message.position, options);
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.wave != null && message.hasOwnProperty("wave"))
            object.wave = message.wave;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.self != null && message.hasOwnProperty("self"))
            object.self = message.self;
        if (message.angle != null && message.hasOwnProperty("angle"))
            object.angle = $root.Position.toObject(message.angle, options);
        if (message.bType != null && message.hasOwnProperty("bType"))
            object.bType = message.bType;
        if (message.removed != null && message.hasOwnProperty("removed"))
            object.removed = message.removed;
        if (message.ownerId != null && message.hasOwnProperty("ownerId"))
            object.ownerId = message.ownerId;
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.health != null && message.hasOwnProperty("health"))
            object.health = message.health;
        if (message.maxHealth != null && message.hasOwnProperty("maxHealth"))
            object.maxHealth = message.maxHealth;
        if (message.pType != null && message.hasOwnProperty("pType"))
            object.pType = message.pType;
        if (message.radius != null && message.hasOwnProperty("radius"))
            object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
        if (message.isAttack != null && message.hasOwnProperty("isAttack"))
            object.isAttack = message.isAttack;
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            object.weapon = message.weapon;
        if (message.inventory != null && message.hasOwnProperty("inventory"))
            object.inventory = $root.Inventory.toObject(message.inventory, options);
        if (message.damageBy != null && message.hasOwnProperty("damageBy"))
            object.damageBy = message.damageBy;
        if (message.style != null && message.hasOwnProperty("style"))
            object.style = message.style;
        if (message.weapons && message.weapons.length) {
            object.weapons = [];
            for (let j = 0; j < message.weapons.length; ++j)
                object.weapons[j] = $root.Weapon.toObject(message.weapons[j], options);
        }
        if (message.timers && message.timers.length) {
            object.timers = [];
            for (let j = 0; j < message.timers.length; ++j)
                object.timers[j] = $root.Timer.toObject(message.timers[j], options);
        }
        if (message.track != null && message.hasOwnProperty("track"))
            object.track = message.track;
        if (message.hat != null && message.hasOwnProperty("hat"))
            object.hat = message.hat;
        return object;
    };

    /**
     * Converts this Entity to JSON.
     * @function toJSON
     * @memberof Entity
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Entity.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Entity
     * @function getTypeUrl
     * @memberof Entity
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Entity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Entity";
    };

    return Entity;
})();

export const Group = $root.Group = (() => {

    /**
     * Properties of a Group.
     * @exports IGroup
     * @interface IGroup
     */

    /**
     * Constructs a new Group.
     * @exports Group
     * @classdesc Represents a Group.
     * @implements IGroup
     * @constructor
     * @param {IGroup=} [properties] Properties to set
     */
    function Group(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Group instance using the specified properties.
     * @function create
     * @memberof Group
     * @static
     * @param {IGroup=} [properties] Properties to set
     * @returns {Group} Group instance
     */
    Group.create = function create(properties) {
        return new Group(properties);
    };

    /**
     * Encodes the specified Group message. Does not implicitly {@link Group.verify|verify} messages.
     * @function encode
     * @memberof Group
     * @static
     * @param {IGroup} message Group message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Group.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Group message, length delimited. Does not implicitly {@link Group.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Group
     * @static
     * @param {IGroup} message Group message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Group.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Group message from the specified reader or buffer.
     * @function decode
     * @memberof Group
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Group} Group
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Group.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Group();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Group message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Group
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Group} Group
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Group.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Group message.
     * @function verify
     * @memberof Group
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Group.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Group message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Group
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Group} Group
     */
    Group.fromObject = function fromObject(object) {
        if (object instanceof $root.Group)
            return object;
        return new $root.Group();
    };

    /**
     * Creates a plain object from a Group message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Group
     * @static
     * @param {Group} message Group
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Group.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Group to JSON.
     * @function toJSON
     * @memberof Group
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Group.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Group
     * @function getTypeUrl
     * @memberof Group
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Group.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Group";
    };

    return Group;
})();

export const ServerMessage = $root.ServerMessage = (() => {

    /**
     * Properties of a ServerMessage.
     * @exports IServerMessage
     * @interface IServerMessage
     * @property {Array.<IEntity>|null} [entities] ServerMessage entities
     * @property {IMap|null} [map] ServerMessage map
     */

    /**
     * Constructs a new ServerMessage.
     * @exports ServerMessage
     * @classdesc Represents a ServerMessage.
     * @implements IServerMessage
     * @constructor
     * @param {IServerMessage=} [properties] Properties to set
     */
    function ServerMessage(properties) {
        this.entities = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ServerMessage entities.
     * @member {Array.<IEntity>} entities
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.entities = $util.emptyArray;

    /**
     * ServerMessage map.
     * @member {IMap|null|undefined} map
     * @memberof ServerMessage
     * @instance
     */
    ServerMessage.prototype.map = null;

    /**
     * Creates a new ServerMessage instance using the specified properties.
     * @function create
     * @memberof ServerMessage
     * @static
     * @param {IServerMessage=} [properties] Properties to set
     * @returns {ServerMessage} ServerMessage instance
     */
    ServerMessage.create = function create(properties) {
        return new ServerMessage(properties);
    };

    /**
     * Encodes the specified ServerMessage message. Does not implicitly {@link ServerMessage.verify|verify} messages.
     * @function encode
     * @memberof ServerMessage
     * @static
     * @param {IServerMessage} message ServerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entities != null && message.entities.length)
            for (let i = 0; i < message.entities.length; ++i)
                $root.Entity.encode(message.entities[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.map != null && Object.hasOwnProperty.call(message, "map"))
            $root.Map.encode(message.map, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link ServerMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ServerMessage
     * @static
     * @param {IServerMessage} message ServerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ServerMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ServerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ServerMessage} ServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServerMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.entities && message.entities.length))
                        message.entities = [];
                    message.entities.push($root.Entity.decode(reader, reader.uint32()));
                    break;
                }
            case 3: {
                    message.map = $root.Map.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ServerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ServerMessage} ServerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ServerMessage message.
     * @function verify
     * @memberof ServerMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ServerMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entities != null && message.hasOwnProperty("entities")) {
            if (!Array.isArray(message.entities))
                return "entities: array expected";
            for (let i = 0; i < message.entities.length; ++i) {
                let error = $root.Entity.verify(message.entities[i]);
                if (error)
                    return "entities." + error;
            }
        }
        if (message.map != null && message.hasOwnProperty("map")) {
            let error = $root.Map.verify(message.map);
            if (error)
                return "map." + error;
        }
        return null;
    };

    /**
     * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ServerMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ServerMessage} ServerMessage
     */
    ServerMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ServerMessage)
            return object;
        let message = new $root.ServerMessage();
        if (object.entities) {
            if (!Array.isArray(object.entities))
                throw TypeError(".ServerMessage.entities: array expected");
            message.entities = [];
            for (let i = 0; i < object.entities.length; ++i) {
                if (typeof object.entities[i] !== "object")
                    throw TypeError(".ServerMessage.entities: object expected");
                message.entities[i] = $root.Entity.fromObject(object.entities[i]);
            }
        }
        if (object.map != null) {
            if (typeof object.map !== "object")
                throw TypeError(".ServerMessage.map: object expected");
            message.map = $root.Map.fromObject(object.map);
        }
        return message;
    };

    /**
     * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ServerMessage
     * @static
     * @param {ServerMessage} message ServerMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ServerMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.entities = [];
        if (options.defaults)
            object.map = null;
        if (message.entities && message.entities.length) {
            object.entities = [];
            for (let j = 0; j < message.entities.length; ++j)
                object.entities[j] = $root.Entity.toObject(message.entities[j], options);
        }
        if (message.map != null && message.hasOwnProperty("map"))
            object.map = $root.Map.toObject(message.map, options);
        return object;
    };

    /**
     * Converts this ServerMessage to JSON.
     * @function toJSON
     * @memberof ServerMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ServerMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ServerMessage
     * @function getTypeUrl
     * @memberof ServerMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ServerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ServerMessage";
    };

    return ServerMessage;
})();

export const Direction = $root.Direction = (() => {

    /**
     * Properties of a Direction.
     * @exports IDirection
     * @interface IDirection
     * @property {number} x Direction x
     * @property {number} y Direction y
     */

    /**
     * Constructs a new Direction.
     * @exports Direction
     * @classdesc Represents a Direction.
     * @implements IDirection
     * @constructor
     * @param {IDirection=} [properties] Properties to set
     */
    function Direction(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Direction x.
     * @member {number} x
     * @memberof Direction
     * @instance
     */
    Direction.prototype.x = 0;

    /**
     * Direction y.
     * @member {number} y
     * @memberof Direction
     * @instance
     */
    Direction.prototype.y = 0;

    /**
     * Creates a new Direction instance using the specified properties.
     * @function create
     * @memberof Direction
     * @static
     * @param {IDirection=} [properties] Properties to set
     * @returns {Direction} Direction instance
     */
    Direction.create = function create(properties) {
        return new Direction(properties);
    };

    /**
     * Encodes the specified Direction message. Does not implicitly {@link Direction.verify|verify} messages.
     * @function encode
     * @memberof Direction
     * @static
     * @param {IDirection} message Direction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Direction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
        writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
        return writer;
    };

    /**
     * Encodes the specified Direction message, length delimited. Does not implicitly {@link Direction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Direction
     * @static
     * @param {IDirection} message Direction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Direction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Direction message from the specified reader or buffer.
     * @function decode
     * @memberof Direction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Direction} Direction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Direction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Direction();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.x = reader.float();
                    break;
                }
            case 2: {
                    message.y = reader.float();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("x"))
            throw $util.ProtocolError("missing required 'x'", { instance: message });
        if (!message.hasOwnProperty("y"))
            throw $util.ProtocolError("missing required 'y'", { instance: message });
        return message;
    };

    /**
     * Decodes a Direction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Direction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Direction} Direction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Direction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Direction message.
     * @function verify
     * @memberof Direction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Direction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.x !== "number")
            return "x: number expected";
        if (typeof message.y !== "number")
            return "y: number expected";
        return null;
    };

    /**
     * Creates a Direction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Direction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Direction} Direction
     */
    Direction.fromObject = function fromObject(object) {
        if (object instanceof $root.Direction)
            return object;
        let message = new $root.Direction();
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        return message;
    };

    /**
     * Creates a plain object from a Direction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Direction
     * @static
     * @param {Direction} message Direction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Direction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        return object;
    };

    /**
     * Converts this Direction to JSON.
     * @function toJSON
     * @memberof Direction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Direction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Direction
     * @function getTypeUrl
     * @memberof Direction
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Direction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Direction";
    };

    return Direction;
})();

export const Build = $root.Build = (() => {

    /**
     * Properties of a Build.
     * @exports IBuild
     * @interface IBuild
     * @property {number} id Build id
     * @property {IDirection} position Build position
     */

    /**
     * Constructs a new Build.
     * @exports Build
     * @classdesc Represents a Build.
     * @implements IBuild
     * @constructor
     * @param {IBuild=} [properties] Properties to set
     */
    function Build(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Build id.
     * @member {number} id
     * @memberof Build
     * @instance
     */
    Build.prototype.id = 0;

    /**
     * Build position.
     * @member {IDirection} position
     * @memberof Build
     * @instance
     */
    Build.prototype.position = null;

    /**
     * Creates a new Build instance using the specified properties.
     * @function create
     * @memberof Build
     * @static
     * @param {IBuild=} [properties] Properties to set
     * @returns {Build} Build instance
     */
    Build.create = function create(properties) {
        return new Build(properties);
    };

    /**
     * Encodes the specified Build message. Does not implicitly {@link Build.verify|verify} messages.
     * @function encode
     * @memberof Build
     * @static
     * @param {IBuild} message Build message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Build.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        $root.Direction.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Build message, length delimited. Does not implicitly {@link Build.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Build
     * @static
     * @param {IBuild} message Build message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Build.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Build message from the specified reader or buffer.
     * @function decode
     * @memberof Build
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Build} Build
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Build.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Build();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.int32();
                    break;
                }
            case 2: {
                    message.position = $root.Direction.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
        if (!message.hasOwnProperty("position"))
            throw $util.ProtocolError("missing required 'position'", { instance: message });
        return message;
    };

    /**
     * Decodes a Build message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Build
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Build} Build
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Build.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Build message.
     * @function verify
     * @memberof Build
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Build.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.id))
            return "id: integer expected";
        {
            let error = $root.Direction.verify(message.position);
            if (error)
                return "position." + error;
        }
        return null;
    };

    /**
     * Creates a Build message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Build
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Build} Build
     */
    Build.fromObject = function fromObject(object) {
        if (object instanceof $root.Build)
            return object;
        let message = new $root.Build();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.position != null) {
            if (typeof object.position !== "object")
                throw TypeError(".Build.position: object expected");
            message.position = $root.Direction.fromObject(object.position);
        }
        return message;
    };

    /**
     * Creates a plain object from a Build message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Build
     * @static
     * @param {Build} message Build
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Build.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.position = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.position != null && message.hasOwnProperty("position"))
            object.position = $root.Direction.toObject(message.position, options);
        return object;
    };

    /**
     * Converts this Build to JSON.
     * @function toJSON
     * @memberof Build
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Build.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Build
     * @function getTypeUrl
     * @memberof Build
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Build.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Build";
    };

    return Build;
})();

export const ClientMessage = $root.ClientMessage = (() => {

    /**
     * Properties of a ClientMessage.
     * @exports IClientMessage
     * @interface IClientMessage
     * @property {IDirection|null} [direction] ClientMessage direction
     * @property {IBuild|null} [build] ClientMessage build
     * @property {string|null} [message] ClientMessage message
     * @property {number|null} [upgradeBuilding] ClientMessage upgradeBuilding
     * @property {number|null} [upgradeWeapon] ClientMessage upgradeWeapon
     * @property {number|null} [sellBuilding] ClientMessage sellBuilding
     * @property {number|null} [buyTimer] ClientMessage buyTimer
     * @property {boolean|null} [attack] ClientMessage attack
     * @property {number|null} [weapon] ClientMessage weapon
     */

    /**
     * Constructs a new ClientMessage.
     * @exports ClientMessage
     * @classdesc Represents a ClientMessage.
     * @implements IClientMessage
     * @constructor
     * @param {IClientMessage=} [properties] Properties to set
     */
    function ClientMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClientMessage direction.
     * @member {IDirection|null|undefined} direction
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.direction = null;

    /**
     * ClientMessage build.
     * @member {IBuild|null|undefined} build
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.build = null;

    /**
     * ClientMessage message.
     * @member {string} message
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.message = "";

    /**
     * ClientMessage upgradeBuilding.
     * @member {number} upgradeBuilding
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.upgradeBuilding = 0;

    /**
     * ClientMessage upgradeWeapon.
     * @member {number} upgradeWeapon
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.upgradeWeapon = 0;

    /**
     * ClientMessage sellBuilding.
     * @member {number} sellBuilding
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.sellBuilding = 0;

    /**
     * ClientMessage buyTimer.
     * @member {number} buyTimer
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.buyTimer = 0;

    /**
     * ClientMessage attack.
     * @member {boolean} attack
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.attack = false;

    /**
     * ClientMessage weapon.
     * @member {number} weapon
     * @memberof ClientMessage
     * @instance
     */
    ClientMessage.prototype.weapon = 0;

    /**
     * Creates a new ClientMessage instance using the specified properties.
     * @function create
     * @memberof ClientMessage
     * @static
     * @param {IClientMessage=} [properties] Properties to set
     * @returns {ClientMessage} ClientMessage instance
     */
    ClientMessage.create = function create(properties) {
        return new ClientMessage(properties);
    };

    /**
     * Encodes the specified ClientMessage message. Does not implicitly {@link ClientMessage.verify|verify} messages.
     * @function encode
     * @memberof ClientMessage
     * @static
     * @param {IClientMessage} message ClientMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
            $root.Direction.encode(message.direction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.build != null && Object.hasOwnProperty.call(message, "build"))
            $root.Build.encode(message.build, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.upgradeBuilding != null && Object.hasOwnProperty.call(message, "upgradeBuilding"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.upgradeBuilding);
        if (message.attack != null && Object.hasOwnProperty.call(message, "attack"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.attack);
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.weapon);
        if (message.sellBuilding != null && Object.hasOwnProperty.call(message, "sellBuilding"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.sellBuilding);
        if (message.upgradeWeapon != null && Object.hasOwnProperty.call(message, "upgradeWeapon"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.upgradeWeapon);
        if (message.buyTimer != null && Object.hasOwnProperty.call(message, "buyTimer"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.buyTimer);
        return writer;
    };

    /**
     * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link ClientMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClientMessage
     * @static
     * @param {IClientMessage} message ClientMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClientMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ClientMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClientMessage} ClientMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClientMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.direction = $root.Direction.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.build = $root.Build.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.message = reader.string();
                    break;
                }
            case 4: {
                    message.upgradeBuilding = reader.int32();
                    break;
                }
            case 9: {
                    message.upgradeWeapon = reader.int32();
                    break;
                }
            case 8: {
                    message.sellBuilding = reader.int32();
                    break;
                }
            case 10: {
                    message.buyTimer = reader.int32();
                    break;
                }
            case 5: {
                    message.attack = reader.bool();
                    break;
                }
            case 7: {
                    message.weapon = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ClientMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClientMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClientMessage} ClientMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClientMessage message.
     * @function verify
     * @memberof ClientMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClientMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.direction != null && message.hasOwnProperty("direction")) {
            let error = $root.Direction.verify(message.direction);
            if (error)
                return "direction." + error;
        }
        if (message.build != null && message.hasOwnProperty("build")) {
            let error = $root.Build.verify(message.build);
            if (error)
                return "build." + error;
        }
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.upgradeBuilding != null && message.hasOwnProperty("upgradeBuilding"))
            if (!$util.isInteger(message.upgradeBuilding))
                return "upgradeBuilding: integer expected";
        if (message.upgradeWeapon != null && message.hasOwnProperty("upgradeWeapon"))
            if (!$util.isInteger(message.upgradeWeapon))
                return "upgradeWeapon: integer expected";
        if (message.sellBuilding != null && message.hasOwnProperty("sellBuilding"))
            if (!$util.isInteger(message.sellBuilding))
                return "sellBuilding: integer expected";
        if (message.buyTimer != null && message.hasOwnProperty("buyTimer"))
            if (!$util.isInteger(message.buyTimer))
                return "buyTimer: integer expected";
        if (message.attack != null && message.hasOwnProperty("attack"))
            if (typeof message.attack !== "boolean")
                return "attack: boolean expected";
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            if (!$util.isInteger(message.weapon))
                return "weapon: integer expected";
        return null;
    };

    /**
     * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClientMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClientMessage} ClientMessage
     */
    ClientMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ClientMessage)
            return object;
        let message = new $root.ClientMessage();
        if (object.direction != null) {
            if (typeof object.direction !== "object")
                throw TypeError(".ClientMessage.direction: object expected");
            message.direction = $root.Direction.fromObject(object.direction);
        }
        if (object.build != null) {
            if (typeof object.build !== "object")
                throw TypeError(".ClientMessage.build: object expected");
            message.build = $root.Build.fromObject(object.build);
        }
        if (object.message != null)
            message.message = String(object.message);
        if (object.upgradeBuilding != null)
            message.upgradeBuilding = object.upgradeBuilding | 0;
        if (object.upgradeWeapon != null)
            message.upgradeWeapon = object.upgradeWeapon | 0;
        if (object.sellBuilding != null)
            message.sellBuilding = object.sellBuilding | 0;
        if (object.buyTimer != null)
            message.buyTimer = object.buyTimer | 0;
        if (object.attack != null)
            message.attack = Boolean(object.attack);
        if (object.weapon != null)
            message.weapon = object.weapon | 0;
        return message;
    };

    /**
     * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClientMessage
     * @static
     * @param {ClientMessage} message ClientMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClientMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.direction = null;
            object.message = "";
            object.build = null;
            object.upgradeBuilding = 0;
            object.attack = false;
            object.weapon = 0;
            object.sellBuilding = 0;
            object.upgradeWeapon = 0;
            object.buyTimer = 0;
        }
        if (message.direction != null && message.hasOwnProperty("direction"))
            object.direction = $root.Direction.toObject(message.direction, options);
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.build != null && message.hasOwnProperty("build"))
            object.build = $root.Build.toObject(message.build, options);
        if (message.upgradeBuilding != null && message.hasOwnProperty("upgradeBuilding"))
            object.upgradeBuilding = message.upgradeBuilding;
        if (message.attack != null && message.hasOwnProperty("attack"))
            object.attack = message.attack;
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            object.weapon = message.weapon;
        if (message.sellBuilding != null && message.hasOwnProperty("sellBuilding"))
            object.sellBuilding = message.sellBuilding;
        if (message.upgradeWeapon != null && message.hasOwnProperty("upgradeWeapon"))
            object.upgradeWeapon = message.upgradeWeapon;
        if (message.buyTimer != null && message.hasOwnProperty("buyTimer"))
            object.buyTimer = message.buyTimer;
        return object;
    };

    /**
     * Converts this ClientMessage to JSON.
     * @function toJSON
     * @memberof ClientMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClientMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ClientMessage
     * @function getTypeUrl
     * @memberof ClientMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ClientMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ClientMessage";
    };

    return ClientMessage;
})();

export { $root as default };
