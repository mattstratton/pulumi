// This file would be autogenerated from schema.

import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as remote from "./remote";

/**
 * ProxyComponentResource is the abstract base class for proxies around component resources.
 *
 * TODO: This should move into the core NodeJS SDK.
 */
abstract class ProxyComponentResource extends pulumi.ComponentResource {
    constructor(
        t: string,
        name: string,
        libraryPath: string,
        libraryName: string,
        inputs: pulumi.Inputs,
        outputs: Record<string, undefined>,
        opts: pulumi.ComponentResourceOptions = {}) {
            // There are two cases:
            // 1. A URN was provided - in this case we are just going to look up the existing resource
            //    and populate this proxy from that URN.
            // 2. A URN was not provided - in this case we are going to remotely construct the resource,
            //    get the URN from the newly constructed resource, then look it up and populate this
            //    proxy from that URN.
            if (!opts.urn) {
                const p = remote.construct(require.resolve(libraryPath), libraryName, name, inputs, opts);
                const urn = p.then(r => <string>r.urn);
                opts = pulumi.mergeOptions(opts, { urn });
            }
            const props = {
                ...inputs,
                ...outputs,
            };
            super(t, name, props, opts);
        }
}

export interface MyComponentArgs {
    input1: pulumi.Input<number>;
}

export class MyComponent extends ProxyComponentResource {
    public myid!: pulumi.Output<string>;
    public output1!: pulumi.Output<number>;
    public innerComponent!: MyInnerComponent;
    public nodeSecurityGroup!: aws.ec2.SecurityGroup;
    constructor(name: string, args: MyComponentArgs, opts?: pulumi.ComponentResourceOptions) {
        super(
            "my:mod:MyComponent",
            name,
            "..",
            "MyComponent",
            args,
            {
                myid: undefined,
                output1: undefined,
                innerComponent: undefined,
                nodeSecurityGroup: undefined,
            },
            opts,
        );
    }
}
pulumi.runtime.registerProxyConstructor("my:mod:MyComponent", MyComponent);


export interface MyInnerComponentArgs {
}

export class MyInnerComponent extends ProxyComponentResource {
    public data!: pulumi.Output<string>;
    constructor(name: string, args: MyInnerComponentArgs, opts?: pulumi.ComponentResourceOptions) {
        super(
            "my:mod:MyInnerComponent",
            name,
            "..",
            "MyInnerComponent",
            args,
            {
                data: undefined,
            },
            opts,
        );
    }
}
pulumi.runtime.registerProxyConstructor("my:mod:MyInnerComponent", MyInnerComponent);