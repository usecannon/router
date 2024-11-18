export const routerTemplate = `//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// GENERATED CODE - do not edit manually!!
// This code was generated by the Synthetix router project and deployed with Cannon.
// Learn more: https://usecannon.com/learn/guides/router
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

contract {{{moduleName}}} {
    error UnknownSelector(bytes4 sel);

{{#diamondCompat}}    constructor() {
        _emitDiamondCutEvent();
    }
{{/diamondCompat}}
    {{{modules}}}
{{#receive}}    {{{receive}}}{{/receive}}
{{^receive}}{{/receive}}
    fallback({{#diamondCompat}}bytes calldata cd{{/diamondCompat}}) external payable{{#diamondCompat}} returns (bytes memory){{/diamondCompat}} {
        // Lookup table: Function selector => implementation contract
        bytes4 sig4 = msg.sig;
        address implementation;

        assembly {
            let sig32 := shr(224, sig4)

            function findImplementation(sig) -> result {
                {{{selectors}}}
            }

            implementation := findImplementation(sig32)
        }

        if (implementation == address(0)) {
{{#diamondCompat}}
            // Check for diamond compat call
            if (sig4 == 0x7a0ed627) {
                return abi.encode(_facets());
            }
            if (sig4 == 0xadfca15e) {
                (address facet) = abi.decode(cd[4:], (address));
                return abi.encode(_facetFunctionSelectors(facet));
            }
            if (sig4 == 0x52ef6b2c) {
                return abi.encode(_facetAddresses());
            }
            if (sig4 == 0xcdffacc6) {
                (bytes4 sig) = abi.decode(cd[4:], (bytes4));
                return abi.encode(_facetAddress(sig));
            }
            if (sig4 == 0x8cce96cb) {
                return abi.encode(_emitDiamondCutEvent());
            }
{{/diamondCompat}}
            revert UnknownSelector(sig4);
        }

        // Delegatecall to the implementation contract
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }
{{#diamondCompat}}
{{{diamondCompat}}}
{{/diamondCompat}}
}
`;
