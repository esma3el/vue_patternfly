import { GraphQLScalarType, Kind } from "graphql";
import dateToString from "./utils/date-to-string";
import stringToDate from "./utils/string-to-date";

const datescalar = new GraphQLScalarType({
name:'Date',
description:'scalar',
serialize(){
    return dateToString(value)
},
parseValue(){
    return stringToDate(value)
},
parseLiteral(ast){
    if(ast.kind === Kind.STRING)
    {
    return stringToDate(ast.value)
}
    throw new UserInputError("error")
},
})