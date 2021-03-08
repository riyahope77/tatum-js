import {IsIn, IsNotEmpty, IsOptional, IsUUID, Length, Min, Validate, ValidateIf} from 'class-validator';
import {SignatureIdValidator} from '../validation/SignatureIdValidator';
import {Currency} from './Currency';

export class MintMultipleErc721 {

    @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.signatureId)
    @Validate(SignatureIdValidator)
    @IsNotEmpty()
    @Length(66, 66)
    public fromPrivateKey: string;

    @IsNotEmpty()
    public to: string[];

    @IsNotEmpty()
    public tokenId: string[];

    @IsNotEmpty()
    public url: string[];

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsNotEmpty()
    @ValidateIf(o => o.chain === Currency.CELO)
    @IsIn([Currency.CELO, Currency.CUSD])
    public feeCurrency: Currency;

    @IsOptional()
    @IsIn([Currency.ETH, Currency.CELO])
    public chain: Currency;

    @ValidateIf(o => (o.fromPrivateKey && o.signatureId) || !o.fromPrivateKey)
    @Validate(SignatureIdValidator)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;
}
