/**
 * @generated SignedSource<<d3775a5039a2269e44b3da81811b2985>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nat"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "nat",
        "variableName": "nat"
      },
      {
        "kind": "Variable",
        "name": "results",
        "variableName": "count"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "gender",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserDob",
        "kind": "LinkedField",
        "name": "dob",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "age",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserName",
        "kind": "LinkedField",
        "name": "name",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "last",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserLocation",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppUserStatsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppUserStatsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d7e02e49652bb72e77e52951ffcc9aac",
    "id": null,
    "metadata": {},
    "name": "AppUserStatsQuery",
    "operationKind": "query",
    "text": "query AppUserStatsQuery(\n  $count: Int!\n  $nat: String!\n) {\n  users(results: $count, nat: $nat) {\n    gender\n    dob {\n      age\n    }\n    name {\n      last\n    }\n    location {\n      state\n    }\n  }\n}\n"
  }
};
})();

node.hash = "ddd5210e9d3540284d924b4f169c9368";

module.exports = node;
