
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    users: async () => {
      await dbConnect();
      return await User.find({});
    },
  },
  Mutation: {
    addUser: async (_: any, { name, email }: { name: string; email: string }) => {
      await dbConnect();
      const user = new User({ name, email });
      await user.save();
      return user;
    },
    updateUser: async (_: any, { _id, name, email }: { _id: string, name: string; email: string }) => {
      await dbConnect();
      const updatedUser = await User.findByIdAndUpdate(_id, {name, email}, {new: true});
      return updatedUser;
    },
    deleteUser: async (_ : any, { _id } : { _id: string}) => {
      await User.findByIdAndDelete(_id);
      return { _id };
    },
  },
};
