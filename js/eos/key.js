define(['underscore'], function(_) {

    var EosKeySchema = /^([a-z]+):\/\/([^:]+)/i;

    /**
     * EosKey object
     *
     * @param {string}    schema
     * @param {string}    key
     * @param {string[]=} tags
     * @constructor
     */
    function EosKey(schema, key, tags) {
        this.schema = schema ? schema : null;
        this.key    = key ? key : null;
        this.tags   = tags && _.isArray(tags) ? tags : [];
    }

    /**
     * Parses source string
     *
     * @param {string} source
     * @return {EosKey}
     */
    EosKey.parse = function parse(source) {
        if (!_.isString(source)) {
            throw "Not valid key source provided";
        }

        var m = EosKeySchema.exec(source);
        if (!m) {
            throw "Cannot parse schema";
        }

        return new EosKey(
            m[1],
            m[2],
            source.replace(EosKeySchema, "").trim().split(":").filter(function(x){ return x !== ""; })
        );
    };

    return EosKey;
});