import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SessionService } from 'src/Services/session.service';
import { JwtAuthGuard } from '../Validators/jwt-auth.guard';


/**
 * Controller for session related operations.
 */
@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }


    /**
   * Endpoint to create a new session.
   * Protected by JwtAuthGuard.
   * @param body - The request body containing session details.
   * @returns A response indicating successful creation of the session.
   */
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createSession(@Body() body) {
        const session = await this.sessionService.createSession(body);
        return { message: "Session created successfully", sessionId: session.sessionId };
    }


    /**
        * Endpoint to get all sessions.
        * Protected by JwtAuthGuard.
        * @returns A list of all sessions.
        */
    // @UseGuards(JwtAuthGuard)
    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllSessions() {
        const sessions = await this.sessionService.getAllSessions();
        if (sessions.length === 0) {
            return { message: "No sessions found" };
        }
        return { sessions };
    }


    /**
    * Endpoint to get a specific session by its ID.
    * Protected by JwtAuthGuard.
    * @param sessionId - The unique identifier of the session.
    * @returns The requested session.
    */
    @UseGuards(JwtAuthGuard)
    @Get(':sessionId')
    async getSession(@Param('sessionId') sessionId: number) {
        const session = await this.sessionService.getSessionById(sessionId);
        if (!session) {
            return { message: "Session not founds" };
        }
        return { session };
    }


    /**
    * Endpoint to start a session.
    * Protected by JwtAuthGuard.
    * @param sessionId - The unique identifier of the session to start.
    * @returns A response indicating the session has started successfully.
    */
    // @UseGuards(JwtAuthGuard)
    @Put('start/:sessionId')
    async startSession(@Param('sessionId') sessionId: number) {
        const session = await this.sessionService.startSession(sessionId);
        return { message: "Session started successfully", session };
    }


    /**
    * Endpoint for a user to join a session.
    * @param body - The request body containing userId and sessionId.
    * @returns A response with the result of the join operation.
    */
    // @UseGuards(JwtAuthGuard)
    @Post('join')
    async joinSession(@Body() body: { userId: number; sessionId: number }) {
        const { userId, sessionId } = body;
        const result = await this.sessionService.joinSession(userId, sessionId);
        return result;
    }



    /**
    * Endpoint to update a session.
    * Protected by JwtAuthGuard.
    * @param sessionId - The unique identifier of the session to update.
    * @param updatedData - The new data for updating the session.
    * @returns A response indicating the session has been updated successfully.
    */
    @UseGuards(JwtAuthGuard)
    @Put('update/:sessionId')
    async updateSession(@Param('sessionId') sessionId: number, @Body() updatedData) {
        const session = await this.sessionService.updateSession(sessionId, updatedData);
        return { message: "Session updated successfully", session };
    }


    /**
    * Endpoint to delete a session.
    * Protected by JwtAuthGuard.
    * @param sessionId - The unique identifier of the session to be deleted.
    * @returns A response indicating the session has been deleted successfully.
    */
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:sessionId')
    async deleteSession(@Param('sessionId') sessionId: number) {
        await this.sessionService.deleteSession(sessionId);
        return { message: "Session deleted successfully" };
    }


    /**
     * Endpoint to get sessions hosted by a specific host.
     * Protected by JwtAuthGuard.
     * @param hostId - The unique identifier of the host.
     * @returns A list of sessions hosted by the specified host.
     */
    @UseGuards(JwtAuthGuard)
    @Get('host/:hostId')
    async getSessionsByHost(@Param('hostId') hostId: number) {
        const sessions = await this.sessionService.getSessionsByHostId(hostId);
        return { sessions };
    }


}